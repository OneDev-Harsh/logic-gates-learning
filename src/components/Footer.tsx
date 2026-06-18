import Link from "next/link";
import { Cpu, GraduationCap, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-secondary text-white">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="font-poppins text-lg font-bold text-slate-800 dark:text-white">
                Logic Gates Hub
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              An interactive learning platform designed to make digital electronics intuitive, visual, and engaging.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins text-sm font-semibold text-slate-900 dark:text-white mb-4">Learning Pathways</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/basic-gates" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white">
                  Basic Logic Gates
                </Link>
              </li>
              <li>
                <Link href="/special-gates" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white">
                  Special Logic Gates
                </Link>
              </li>
              <li>
                <Link href="/universal-gates" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white">
                  Universal NAND/NOR Gates
                </Link>
              </li>
              <li>
                <Link href="/playground" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white">
                  Circuit Playground
                </Link>
              </li>
            </ul>
          </div>

          {/* Assess & Interactive */}
          <div>
            <h3 className="font-poppins text-sm font-semibold text-slate-900 dark:text-white mb-4">Assessment</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/quiz" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white">
                  Test Your Skills (Quiz)
                </Link>
              </li>
              <li>
                <Link href="/applications" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white">
                  Real-World Applications
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white">
                  About the Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Info */}
          <div>
            <h3 className="font-poppins text-sm font-semibold text-slate-900 dark:text-white mb-4">Resources</h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
              <GraduationCap className="h-4 w-4" />
              <span>Perfect for STEM Education</span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive demonstrations, simulated inputs/outputs, real-world animations, and auto-graded assessments.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Logic Gates Learning Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Built for students worldwide with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
