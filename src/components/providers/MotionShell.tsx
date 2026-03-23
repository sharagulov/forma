"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const SmoothScrollProvider = dynamic(
  () =>
    import("@/components/providers/SmoothScrollProvider").then((m) => ({
      default: m.SmoothScrollProvider,
    })),
  { ssr: false },
);

const PageLoader = dynamic(
  () => import("@/components/shared/Loader").then((m) => ({ default: m.Loader })),
  { ssr: false },
);

const CustomCursor = dynamic(
  () =>
    import("@/components/layout/CustomCursor").then((m) => ({
      default: m.CustomCursor,
    })),
  { ssr: false },
);

export function MotionShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <PageLoader />
        <CustomCursor />
        {children}
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
