import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeInitializer from "@/components/ThemeInitializer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Logic Gates Learning Hub",
  description: "Master the building blocks of digital electronics through interactive learning, visual simulations, and real-world examples.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col font-inter">
        <ThemeInitializer />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
