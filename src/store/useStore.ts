import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Badge {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

interface AppState {
  theme: "light" | "dark";
  visitedPages: string[];
  quizCompleted: boolean;
  quizScore: number;
  badges: Badge[];
  searchQuery: string;
  toggleTheme: () => void;
  visitPage: (page: string) => void;
  completeQuiz: (score: number) => void;
  setSearchQuery: (query: string) => void;
  resetProgress: () => void;
}

const initialBadges: Badge[] = [
  {
    id: "logic-beginner",
    name: "Logic Beginner",
    description: "Start your journey by visiting 3 learning pages.",
    unlocked: false,
    icon: "🌱",
  },
  {
    id: "gate-explorer",
    name: "Gate Explorer",
    description: "Explore all basic, special, and universal gates.",
    unlocked: false,
    icon: "🚀",
  },
  {
    id: "quiz-master",
    name: "Quiz Master",
    description: "Score 80% or higher on the Logic Gates assessment quiz.",
    unlocked: false,
    icon: "🏆",
  },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: "light",
      visitedPages: [],
      quizCompleted: false,
      quizScore: 0,
      badges: initialBadges,
      searchQuery: "",

      toggleTheme: () => {
        const nextTheme = get().theme === "light" ? "dark" : "light";
        if (typeof window !== "undefined") {
          const root = window.document.documentElement;
          if (nextTheme === "dark") {
            root.classList.add("dark");
          } else {
            root.classList.remove("dark");
          }
        }
        set({ theme: nextTheme });
      },

      visitPage: (page: string) => {
        const currentVisited = get().visitedPages;
        if (!currentVisited.includes(page)) {
          const nextVisited = [...currentVisited, page];
          
          // Check for badges
          const nextBadges = get().badges.map((badge) => {
            if (badge.id === "logic-beginner" && nextVisited.length >= 3) {
              return { ...badge, unlocked: true };
            }
            const corePages = ["/basic-gates", "/special-gates", "/universal-gates", "/applications"];
            const visitedCore = corePages.every((p) => nextVisited.includes(p));
            if (badge.id === "gate-explorer" && visitedCore) {
              return { ...badge, unlocked: true };
            }
            return badge;
          });

          set({ visitedPages: nextVisited, badges: nextBadges });
        }
      },

      completeQuiz: (score: number) => {
        const nextBadges = get().badges.map((badge) => {
          if (badge.id === "quiz-master" && score >= 8) {
            return { ...badge, unlocked: true };
          }
          return badge;
        });

        set({ quizCompleted: true, quizScore: Math.max(get().quizScore, score), badges: nextBadges });
      },

      setSearchQuery: (query: string) => set({ searchQuery: query }),

      resetProgress: () => set({
        visitedPages: [],
        quizCompleted: false,
        quizScore: 0,
        badges: initialBadges,
        searchQuery: ""
      }),
    }),
    {
      name: "logic-gates-learning-hub-store",
    }
  )
);
