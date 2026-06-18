"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { Search, Sun, Moon, Menu, X, Award, Cpu, BookOpen, Layers, Play, HelpCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/", icon: BookOpen },
  { name: "Basic", href: "/basic-gates", icon: Cpu },
  { name: "Special", href: "/special-gates", icon: Layers },
  { name: "Universal", href: "/universal-gates", icon: Layers },
  { name: "Applications", href: "/applications", icon: BookOpen },
  { name: "Playground", href: "/playground", icon: Play },
  { name: "Quiz", href: "/quiz", icon: HelpCircle },
  { name: "About", href: "/about", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, visitedPages, badges, visitPage } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    visitPage(pathname);
  }, [pathname, visitPage]);

  const progressPercent = Math.round(
    ((visitedPages.length + (useStore.getState().quizCompleted ? 1 : 0)) / 9) * 100
  );

  const activeBadgesCount = badges.filter((b) => b.unlocked).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().trim();
    setSearchOpen(false);
    setSearchQuery("");

    if (query.includes("and") || query.includes("or") || query.includes("not")) {
      router.push("/basic-gates");
    } else if (query.includes("xor") || query.includes("xnor")) {
      router.push("/special-gates");
    } else if (query.includes("nand") || query.includes("nor") || query.includes("universal")) {
      router.push("/universal-gates");
    } else if (query.includes("app") || query.includes("phone") || query.includes("computer")) {
      router.push("/applications");
    } else if (query.includes("play") || query.includes("circuit") || query.includes("sandbox")) {
      router.push("/playground");
    } else if (query.includes("quiz") || query.includes("test")) {
      router.push("/quiz");
    } else if (query.includes("about")) {
      router.push("/about");
    } else {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0 whitespace-nowrap">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white shadow-md shadow-primary/20 transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
            <Cpu className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-xl font-bold tracking-tight text-transparent font-poppins whitespace-nowrap">
            Logic Gates Hub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex space-x-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right side items */}
        <div className="flex items-center gap-3">
          {/* Progress Tracker (Desktop) */}
          {mounted && (
            <div className="hidden lg:flex items-center gap-4 border-r border-slate-200 dark:border-slate-800 pr-4 flex-shrink-0">
              <div className="flex flex-col items-end">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Learning Journey</span>
                <span className="text-xs font-bold text-primary dark:text-blue-400">{progressPercent}% Completed</span>
              </div>
              <div className="h-2 w-20 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${Math.min(100, progressPercent)}%` }}
                />
              </div>
              <div className="flex items-center gap-1" title="Unlocked Badges">
                <Award className={`h-4 w-4 ${activeBadgesCount > 0 ? "text-accent" : "text-slate-300 dark:text-slate-700"}`} />
                <span className="text-xs font-bold">{activeBadgesCount}</span>
              </div>
            </div>
          )}

          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle Theme"
          >
            {mounted && theme === "dark" ? <Sun className="h-5 w-5 text-accent" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 px-4 py-4 space-y-1 shadow-inner"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-4">
              <span className="text-sm font-medium text-slate-500">Progress</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-primary dark:text-blue-400">{progressPercent}%</span>
                <div className="h-1.5 w-24 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${Math.min(100, progressPercent)}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Dialog Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 p-4 pt-[15vh] backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="w-full max-w-lg overflow-hidden rounded-2xl bg-white p-4 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            >
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search gates (AND, XOR, NAND...), apps, quiz..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-slate-800 outline-none placeholder-slate-400 dark:text-white"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
              <div className="mt-4 text-xs text-slate-400">
                <p className="font-semibold mb-2">Try searching for:</p>
                <div className="flex flex-wrap gap-2">
                  {["AND Gate", "XOR simulation", "Universal Gates", "Quiz", "Playground", "Smartphone unlock"].map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setSearchQuery(kw)}
                      className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-primary transition-all"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
