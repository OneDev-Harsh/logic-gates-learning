"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { Cpu, Award, RefreshCw, CheckCircle2, Star, BookOpen, GraduationCap } from "lucide-react";

export default function About() {
  const { visitPage, visitedPages, quizCompleted, quizScore, badges, resetProgress } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    visitPage("/about");
    setMounted(true);
  }, [visitPage]);

  const progressPercent = Math.round(
    ((visitedPages.length + (quizCompleted ? 1 : 0)) / 9) * 100
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-8 mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-poppins">
          About This Project
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Learn about our mission, content mapping, target audience, and track your accomplishments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        {/* Left: General Description */}
        <div className="lg:col-span-7 space-y-8">
          <div className="glass p-6 rounded-2xl dark:bg-slate-800/50">
            <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Cpu className="h-5.5 w-5.5 text-primary" />
              Our Mission
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              This interactive educational website was created to help students understand Logic Gates through engaging learning experiences. We believe that binary equations are best understood through live manipulation rather than memorizing textbooks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Topics Covered */}
            <div className="glass p-5 rounded-2xl dark:bg-slate-800/50">
              <h4 className="font-bold font-poppins text-slate-950 dark:text-white mb-3 text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Topics Covered
              </h4>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Basic Logic Gates (AND, OR, NOT)</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Special Logic Gates (XOR, XNOR)</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Universal gates logic (NAND/NOR)</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Smartphone & Calculator circuits</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Comprehensive Assessments</li>
              </ul>
            </div>

            {/* Target Audience */}
            <div className="glass p-5 rounded-2xl dark:bg-slate-800/50">
              <h4 className="font-bold font-poppins text-slate-950 dark:text-white mb-3 text-sm flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-secondary" />
                Suitable For
              </h4>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-accent fill-accent" /> High School STEM Students</li>
                <li className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-accent fill-accent" /> Diploma & Vocational students</li>
                <li className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-accent fill-accent" /> Undergraduate Engineering students</li>
                <li className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-accent fill-accent" /> Digital Design Beginners</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right: User Progress Tracker Dashboard */}
        <div className="lg:col-span-5 space-y-6">
          {mounted && (
            <div className="glass p-6 rounded-2xl dark:bg-slate-800/50">
              <h3 className="text-lg font-bold font-poppins text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                <Award className="h-5.5 w-5.5 text-accent" />
                Aesthetic Progress & Badges
              </h3>

              {/* Progress Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Hub Journey Completed</span>
                  <span className="text-primary dark:text-blue-400">{progressPercent}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-350"
                    style={{ width: `${Math.min(100, progressPercent)}%` }}
                  />
                </div>
              </div>

              {/* Badges Display */}
              <div className="space-y-3 mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Unlocked Badges</span>
                <div className="grid grid-cols-3 gap-3">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                        badge.unlocked
                          ? "bg-primary/5 border-primary/20 dark:bg-primary/10"
                          : "bg-transparent border-slate-150 opacity-40"
                      }`}
                      title={badge.description}
                    >
                      <span className="text-2xl mb-1">{badge.icon}</span>
                      <span className="text-xxs font-bold font-poppins leading-tight truncate w-full text-slate-800 dark:text-white">
                        {badge.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats detail */}
              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Pages Explored:</span>
                  <span className="font-bold text-slate-850 dark:text-white">{visitedPages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quiz Completed:</span>
                  <span className="font-bold text-slate-850 dark:text-white">{quizCompleted ? "Yes" : "No"}</span>
                </div>
                {quizCompleted && (
                  <div className="flex justify-between">
                    <span>Quiz High Score:</span>
                    <span className="font-bold text-slate-850 dark:text-white">{quizScore} / 10</span>
                  </div>
                )}
              </div>

              {/* Reset Progress */}
              <button
                onClick={resetProgress}
                className="w-full py-2.5 px-4 rounded-xl border border-rose-200 text-rose-500 dark:border-rose-950/20 hover:bg-rose-50 dark:hover:bg-rose-950/10 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset Learning Progress
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
