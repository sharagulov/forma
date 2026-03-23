import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-28 text-center">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
        404
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[var(--fg)]">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-[var(--muted)]">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex border border-[var(--line)] px-8 py-3 text-sm font-medium uppercase tracking-[0.12em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        Back home
      </Link>
    </div>
  );
}
