import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          dark: "#3B82F6",
        },
        secondary: {
          DEFAULT: "#0EA5E9",
          dark: "#38BDF8",
        },
        accent: {
          DEFAULT: "#F59E0B",
          dark: "#FBBF24",
        },
        success: {
          DEFAULT: "#10B981",
          dark: "#34D399",
        },
        darkSlate: "#0F172A",
        lightGray: "#F8FAFC",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
