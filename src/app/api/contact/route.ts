import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkContactRateLimit } from "@/lib/contact-rate-limit";
import {
  contactBodySchema,
  formatValidationError,
} from "@/lib/contact-validation";
import { verifyContactRequestOrigin } from "@/lib/verify-origin";

export const runtime = "nodejs";

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

export async function POST(request: Request) {
  if (!verifyContactRequestOrigin(request)) {
    return NextResponse.json(
      { ok: false, error: "forbidden" },
      { status: 403 },
    );
  }

  if (!checkContactRateLimit(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "validation",
        details: [{ field: "body", message: "invalid_json" }],
      },
      { status: 400 },
    );
  }

  const parsed = contactBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation",
        details: formatValidationError(parsed.error.issues),
      },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("contact_config_missing");
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `FORMA contact: ${name.slice(0, 80)}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("contact_send_failed", { code: error.name });
      return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    console.error("contact_send_failed");
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "method_not_allowed" },
    { status: 405 },
  );
}
