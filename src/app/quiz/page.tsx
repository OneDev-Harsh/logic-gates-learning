"use client";

import { useState, useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, RotateCcw, CheckCircle, XCircle, ArrowRight, Trophy } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number; // Index of correct option
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "An AND gate output is 1 (HIGH) when:",
    options: [
      "Any one input is 1",
      "Both inputs are 1",
      "Both inputs are 0",
      "One input is 0 and the other is 1",
    ],
    answer: 1,
  },
  {
    id: 2,
    question: "Which of the following is classified as a Universal Gate?",
    options: ["AND Gate", "XOR Gate", "NAND Gate", "NOT Gate"],
    answer: 2,
  },
  {
    id: 3,
    question: "A NOT gate is also commonly called a/an:",
    options: ["Inverter", "Multiplier", "Buffer", "Comparator"],
    answer: 0,
  },
  {
    id: 4,
    question: "An XOR (Exclusive OR) gate gives an output of 1 when:",
    options: [
      "Both inputs are the same",
      "Inputs are different",
      "Both inputs are 0",
      "At least one input is 0",
    ],
    answer: 1,
  },
  {
    id: 5,
    question: "An OR gate output is 0 (LOW) only when:",
    options: [
      "Both inputs are 0",
      "Any one input is 1",
      "Both inputs are 1",
      "Inputs are different",
    ],
    answer: 0,
  },
  {
    id: 6,
    question: "A NAND gate output is 0 (LOW) only when:",
    options: [
      "Any one input is 0",
      "Both inputs are 0",
      "Both inputs are 1",
      "Inputs are different",
    ],
    answer: 2,
  },
  {
    id: 7,
    question: "An XNOR gate output is 1 (HIGH) when:",
    options: [
      "Inputs are different",
      "Both inputs are the same",
      "Input A is 1 and Input B is 0",
      "Both inputs are 0 only",
    ],
    answer: 1,
  },
  {
    id: 8,
    question: "Which basic logic gate performs logical inversion?",
    options: ["NOT Gate", "OR Gate", "AND Gate", "XOR Gate"],
    answer: 0,
  },
  {
    id: 9,
    question: "A NOR gate output is 1 (HIGH) when:",
    options: [
      "Both inputs are 1",
      "Any one input is 1",
      "Both inputs are 0",
      "Inputs are different",
    ],
    answer: 2,
  },
  {
    id: 10,
    question: "An XOR gate is mainly utilized in which digital applications?",
    options: [
      "Arithmetic addition circuits (Adders) and Parity checks",
      "Simple battery indicators",
      "Unregulated voltage control keys",
      "Direct current power relays",
    ],
    answer: 0,
  },
];

export default function Quiz() {
  const { visitPage, completeQuiz } = useStore();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [timerVal, setTimerVal] = useState<number>(30); // 30 seconds per question

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    visitPage("/quiz");
  }, [visitPage]);

  // Start question timer
  useEffect(() => {
    if (quizFinished) return;

    setTimerVal(30);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimerVal((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Auto submit
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIdx, quizFinished]);

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmit = () => {
    if (selectedOpt === null || isSubmitted) return;
    setIsSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const question = quizQuestions[currentIdx];
    if (selectedOpt === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      completeQuiz(score);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setTimerVal(30);
  };

  const getPerformanceMessage = (pct: number) => {
    if (pct >= 90) return { title: "Excellent!", desc: "You are a digital logic master! Outstanding understanding of gates.", color: "text-emerald-500" };
    if (pct >= 70) return { title: "Good Job!", desc: "Great digital circuit knowledge! Just a couple of concepts to brush up.", color: "text-blue-500" };
    if (pct >= 50) return { title: "Average", desc: "Decent attempt. Revisit basic and universal gates simulations to improve.", color: "text-amber-500" };
    return { title: "Needs Improvement", desc: "Keep practicing! Review gate truth tables and toggle simulations again.", color: "text-rose-500" };
  };

  const percentage = (score / quizQuestions.length) * 100;
  const performance = getPerformanceMessage(percentage);

  // Pie chart data for results
  const chartData = [
    { name: "Correct", value: score, color: "#10B981" },
    { name: "Wrong", value: quizQuestions.length - score, color: "#F43F5E" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-8 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-poppins">
            Assessment Quiz
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Validate your knowledge of digital gates, universal systems, and circuit formulas.
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key="question-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass p-6 md:p-8 rounded-2xl dark:bg-slate-800/50 relative overflow-hidden"
          >
            {/* Header / Info row */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-slate-450 uppercase tracking-widest">
                Question {currentIdx + 1} of {quizQuestions.length}
              </span>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold">
                <Timer className={`h-4.5 w-4.5 ${timerVal <= 5 ? "text-rose-500 animate-pulse" : ""}`} />
                <span className={timerVal <= 5 ? "text-rose-500 font-bold" : ""}>{timerVal}s</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-850 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-350"
                style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white mb-6 leading-relaxed">
              {quizQuestions[currentIdx].question}
            </h2>

            {/* Options list */}
            <div className="space-y-3 mb-8">
              {quizQuestions[currentIdx].options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === quizQuestions[currentIdx].answer;
                
                let optionStyle = "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800";
                if (isSelected && !isSubmitted) {
                  optionStyle = "border-primary bg-primary/5 text-primary dark:border-blue-400 dark:text-blue-400";
                }
                if (isSubmitted) {
                  if (isCorrect) {
                    optionStyle = "border-success bg-emerald-50 text-success dark:bg-emerald-950/20";
                  } else if (isSelected) {
                    optionStyle = "border-rose-500 bg-rose-50 text-rose-500 dark:bg-rose-950/20";
                  } else {
                    optionStyle = "border-slate-100 dark:border-slate-800 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isSubmitted}
                    className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && isCorrect && <CheckCircle className="h-5 w-5 text-success" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-rose-500" />}
                  </button>
                );
              })}
            </div>

            {/* Control buttons */}
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOpt === null}
                  className="px-6 py-3 rounded-xl bg-primary hover:bg-blue-700 text-white font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Verify Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-primary hover:bg-blue-700 text-white font-semibold shadow-md hover:scale-[1.02] active:scale-95 transition-all"
                >
                  {currentIdx === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          // Quiz Results screen with Recharts dashboard
          <motion.div
            key="results-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left: Recharts Pie & Metrics */}
            <div className="md:col-span-5 glass p-6 rounded-2xl dark:bg-slate-800/50 flex flex-col items-center justify-center min-h-[300px]">
              <h3 className="text-lg font-bold font-poppins text-slate-800 dark:text-white mb-4">Results Dashboard</h3>
              <div className="h-48 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {chartData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                      <Label
                        value={`${percentage}%`}
                        position="center"
                        fill="currentColor"
                        className="text-slate-800 dark:text-white font-bold font-poppins text-xl"
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex gap-6 mt-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-success" />
                  <span>{score} Correct</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-rose-500" />
                  <span>{quizQuestions.length - score} Wrong</span>
                </div>
              </div>
            </div>

            {/* Right: Message, Score & Restart */}
            <div className="md:col-span-7 glass p-6 rounded-2xl dark:bg-slate-800/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="h-8 w-8 text-accent animate-bounce" />
                  <h3 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white">
                    Quiz Completed!
                  </h3>
                </div>
                <h4 className={`text-xl font-bold font-poppins ${performance.color} mb-2`}>
                  {performance.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {performance.desc}
                </p>

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Total Score:</span>
                    <span className="font-bold text-slate-800 dark:text-white">{score} / {quizQuestions.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Correct Answer Ratio:</span>
                    <span className="font-bold text-success">{percentage}%</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleRestart}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-350 hover:border-slate-450 dark:border-slate-700 dark:hover:border-slate-650 font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-95 transition-all"
                >
                  <RotateCcw className="h-4.5 w-4.5" />
                  Restart Quiz
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
