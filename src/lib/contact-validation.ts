import { z } from "zod";

const noCrLf = (value: string) => !/[\r\n]/.test(value);

export const contactBodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "required")
    .max(200, "max_length")
    .refine(noCrLf, "invalid_chars"),
  email: z
    .string()
    .trim()
    .email("email")
    .max(254, "max_length")
    .refine(noCrLf, "invalid_chars"),
  message: z.string().trim().min(1, "required").max(10000, "max_length"),
});

export type ContactBody = z.infer<typeof contactBodySchema>;

export function formatValidationError(
  issues: z.ZodIssue[],
): { field: string; message: string }[] {
  return issues.map((issue) => ({
    field: issue.path.join(".") || "body",
    message: issue.message,
  }));
}
