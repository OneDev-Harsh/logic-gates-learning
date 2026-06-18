"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, Activity, Settings, Layers, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";

export default function Home() {
  const { visitPage } = useStore();

  useEffect(() => {
    visitPage("/");
  }, [visitPage]);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-30">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/30 rounded-full blur-3xl glow-bg" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl glow-bg" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-blue-400">
              <Zap className="h-4 w-4 text-accent fill-accent" />
              Interactive STEM Platform
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-white font-poppins">
              Logic Gates <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Learning Hub
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Master the building blocks of digital electronics through interactive learning, visual simulations, and real-world examples.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/basic-gates">
                <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-blue-700 text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                  Start Learning
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <Link href="/quiz">
                <button className="px-6 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:scale-105 active:scale-95">
                  Take Quiz
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Visual: Animated Circuit Board */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center items-center h-[350px] sm:h-[450px]"
          >
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 blur-2xl" />
            <svg
              viewBox="0 0 400 400"
              className="w-full max-w-[400px] h-auto drop-shadow-xl relative z-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid Background */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#0EA5E9" />
                </linearGradient>
              </defs>
              <rect width="400" height="400" fill="url(#grid)" className="opacity-50" />

              {/* Circuit lines */}
              <path d="M 50 150 L 150 150 L 180 180 M 50 250 L 150 250 L 180 220" stroke="url(#blueGrad)" strokeWidth="3" className="circuit-line" />
              <path d="M 240 200 L 350 200" stroke="url(#blueGrad)" strokeWidth="3" className="circuit-line" />

              {/* Pulsing Signal Particles */}
              <circle r="4" fill="#F59E0B">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 50 150 L 150 150 L 180 180" />
              </circle>
              <circle r="4" fill="#F59E0B">
                <animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="M 50 250 L 150 250 L 180 220" />
              </circle>
              <circle r="4" fill="#10B981">
                <animateMotion dur="4s" begin="1s" repeatCount="indefinite" path="M 240 200 L 350 200" />
              </circle>

              {/* AND Gate Symbol */}
              <g transform="translate(180, 160)">
                <rect width="60" height="80" rx="30" fill="white" className="dark:fill-slate-800" stroke="url(#blueGrad)" strokeWidth="4" />
                <path d="M 0 40 L 60 40" stroke="url(#blueGrad)" strokeWidth="4" />
                {/* Inputs */}
                <circle cx="0" cy="20" r="6" fill="#2563EB" />
                <circle cx="0" cy="60" r="6" fill="#2563EB" />
                {/* Output */}
                <circle cx="60" cy="40" r="6" fill="#10B981" />
                <text x="30" y="46" textAnchor="middle" fill="currentColor" className="text-slate-800 dark:text-slate-200 font-bold font-poppins text-lg">AND</text>
              </g>

              {/* Binary digits floating around */}
              <text x="70" y="100" fill="#2563EB" className="animate-bounce font-mono font-bold text-xl opacity-75" style={{ animationDelay: "0.2s" }}>1</text>
              <text x="300" y="120" fill="#0EA5E9" className="animate-bounce font-mono font-bold text-xl opacity-75" style={{ animationDelay: "0.7s" }}>0</text>
              <text x="120" y="320" fill="#F59E0B" className="animate-bounce font-mono font-bold text-xl opacity-75" style={{ animationDelay: "1.2s" }}>1</text>
              <text x="320" y="280" fill="#10B981" className="animate-bounce font-mono font-bold text-xl opacity-75" style={{ animationDelay: "0.5s" }}>0</text>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-poppins">
            Understanding Logic Gates
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Logic gates are the fundamental building blocks of digital electronics. They perform basic logical operations that are essential for decision-making in digital systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-6 rounded-2xl shadow-sm dark:bg-slate-800/50 hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-poppins mb-2">Binary Inputs</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Logic gates process binary digits (0 and 1) representing High (ON) and Low (OFF) electrical states.
            </p>
          </div>
          <div className="glass p-6 rounded-2xl shadow-sm dark:bg-slate-800/50 hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
              <Settings className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-poppins mb-2">Boolean Logic</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Operations follow Boolean algebra, mapping specific input combinations to deterministic outputs.
            </p>
          </div>
          <div className="glass p-6 rounded-2xl shadow-sm dark:bg-slate-800/50 hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-poppins mb-2">Complex Systems</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              By combining simple logic gates, engineers construct complex microprocessors and computing devices.
            </p>
          </div>
        </div>
      </section>

      {/* Why Logic Gates Matter Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-poppins">
            Why Logic Gates Matter
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            From modern pocket smartphones to fully automated factories, digital logic rules the technical world.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Feature 1 */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-slate-50 p-6 dark:bg-slate-800 hover:scale-[1.03] transition-all duration-300 border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-poppins mb-2 text-slate-950 dark:text-white">Digital Electronics</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Forming the complete bedrock of all components, memory cards, and input/output interfaces.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-slate-50 p-6 dark:bg-slate-800 hover:scale-[1.03] transition-all duration-300 border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <div className="h-12 w-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-poppins mb-2 text-slate-950 dark:text-white">Computers & CPUs</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Billions of microscopic transistors act as logic gates executing code in modern central processing units.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-slate-50 p-6 dark:bg-slate-800 hover:scale-[1.03] transition-all duration-300 border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <div className="h-12 w-12 rounded-xl bg-accent/15 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Settings className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-poppins mb-2 text-slate-950 dark:text-white">Automation Systems</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Controlling smart lights, traffic lanes, thermostat thresholds, and factory assembly robotics.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-slate-50 p-6 dark:bg-slate-800 hover:scale-[1.03] transition-all duration-300 border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <div className="h-12 w-12 rounded-xl bg-success/15 text-success flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-poppins mb-2 text-slate-950 dark:text-white">Decision Circuits</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enabling smart calculations, matching password hashes, and processing digital audio feeds.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Learning Journey Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-poppins">
            Your Learning Journey
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Follow our structured learning map to progress from fundamental principles to full master level.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-slate-200 dark:bg-slate-850 transform -translate-x-1/2" />

          {/* Steps */}
          {[
            {
              step: "Step 1",
              title: "Basic Gates",
              desc: "Learn the foundational AND, OR, and NOT gates. Toggle switches to see logic results immediately.",
              link: "/basic-gates",
              color: "bg-primary text-white",
            },
            {
              step: "Step 2",
              title: "Special Gates",
              desc: "Explore XOR and XNOR gates. Watch password verifiers and comparator logic circuits work.",
              link: "/special-gates",
              color: "bg-secondary text-white",
            },
            {
              step: "Step 3",
              title: "Applications",
              desc: "Understand how logic gates power smartphones, memory devices, robotics, and CPU hardware.",
              link: "/applications",
              color: "bg-accent text-white",
            },
            {
              step: "Step 4",
              title: "Universal Gates",
              desc: "Discover how NAND and NOR gates can implement every single other logic gate.",
              link: "/universal-gates",
              color: "bg-success text-white",
            },
            {
              step: "Step 5",
              title: "Quiz & Assessment",
              desc: "Test your digital logic capabilities. View charts of your scores and earn badges.",
              link: "/quiz",
              color: "bg-gradient-to-r from-primary to-secondary text-white",
            },
          ].map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-12 md:mb-8"
              >
                {/* Connector point */}
                <div className="absolute left-4 md:left-1/2 h-8 w-8 rounded-full border-4 border-white dark:border-slate-900 bg-primary shadow-md transform -translate-x-1/2 z-10 flex items-center justify-center text-xs font-bold text-white">
                  {idx + 1}
                </div>

                <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isLeft ? "md:text-right" : "md:order-last md:text-left"}`}>
                  <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 30 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-700"
                  >
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-poppins mb-2 ${item.color}`}>
                      {item.step}
                    </span>
                    <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{item.desc}</p>
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Explore Step
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
                {/* Spacer */}
                <div className="hidden md:block w-5/12" />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
