"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";

export default function ThemeInitializer() {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return null;
}
