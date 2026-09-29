"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

// Suppress Next.js 15 / React 19 script tag warning caused by next-themes
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    const errorMsg = typeof args[0] === "string" ? args[0] : "";
    if (errorMsg.includes("Encountered a script tag while rendering React component")) {
      return;
    }
    // Suppress hydration errors caused by browser extensions (like Bitwarden) adding attributes
    if (args.some((arg) => typeof arg === "string" && arg.includes("fdprocessedid"))) {
      return;
    }
    originalError.apply(console, args);
  };
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
