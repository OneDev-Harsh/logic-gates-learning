"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Smartphone, Calculator, HardDrive, TrafficCone, ShieldCheck, HelpCircle, X, ChevronRight, Fingerprint, Check } from "lucide-react";

interface AppCard {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  detail: string;
  color: string;
}

const appCards: AppCard[] = [
  {
    id: "computers",
    title: "Computers & CPUs",
    icon: Cpu,
    desc: "CPU execution units perform mathematical computations using billions of logic gates.",
    detail: "Central Processing Units (CPUs) utilize ALU (Arithmetic Logic Unit) circuits which combine billions of AND, OR, XOR, and NAND gates to perform binary addition, subtraction, memory fetch addresses, and execute code instructions at billions of operations per second.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "smartphones",
    title: "Smartphones",
    icon: Smartphone,
    desc: "Power management, screen refresh toggles, and verification checks.",
    detail: "Mobile phone hardware integrates complex Systems on Chip (SoC). These processors use low-power logic gates to route audio pathways, switch display controller refreshing states, decode wireless network communications, and verify touch inputs.",
    color: "from-sky-400 to-blue-500",
  },
  {
    id: "calculators",
    title: "Digital Calculators",
    icon: Calculator,
    desc: "Simple display decoding and sum logic implementations.",
    detail: "Calculators use basic multiplexers and 7-segment display decoders built directly from combinational logic gates. Pressing a button triggers inputs which are mapped using logic gate formulas to output decimal numbers on screens.",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "memory",
    title: "Memory Devices",
    icon: HardDrive,
    desc: "Flip-flops and latches built from cross-coupled logic gates store information.",
    detail: "SRAM and latch memory circuits are constructed by connecting logic gates back-to-back (feedback loops). NAND or NOR gates configured as SR latches can lock and hold a state (0 or 1) indefinitely as long as power is applied.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "traffic",
    title: "Traffic Control Systems",
    icon: TrafficCone,
    desc: "Sensor check gates deciding red, yellow, and green durations.",
    detail: "Intersection traffic control signals process inputs from loop sensors under the pavement or video feeds. Logic systems decide when to switch colors safely, guaranteeing opposing directions are never green simultaneously.",
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: "security",
    title: "Security Systems",
    icon: ShieldCheck,
    desc: "Sensor matrices triggering alarms using AND/OR parameters.",
    detail: "Alarm triggers monitor window switches, motion detectors, and passcode keypads. Combining them using AND/OR criteria determines if an alarm siren should trigger (e.g. [Siren ON] = [Armed] AND ([Window Open] OR [Motion Sensor])).",
    color: "from-rose-500 to-red-650",
  },
  {
    id: "robotics",
    title: "Robotics & Controllers",
    icon: HelpCircle,
    desc: "Servo sensors and automated threshold checks.",
    detail: "Microcontrollers in robotic machinery take sensor measurements (like proximity or temperature) and compare them to set thresholds. Simple digital gates execute emergency shuts and direction switches immediately without software lag.",
    color: "from-violet-500 to-purple-600",
  },
];

export default function Applications() {
  const { visitPage } = useStore();
  const [selectedCard, setSelectedCard] = useState<AppCard | null>(null);
  const [unlockStep, setUnlockStep] = useState<number>(0);
  const [isFingerPressed, setIsFingerPressed] = useState<boolean>(false);

  useEffect(() => {
    visitPage("/applications");
  }, [visitPage]);

  // Smartphone Unlock Animation Loop
  useEffect(() => {
    if (isFingerPressed) {
      setUnlockStep(1);
      const timer1 = setTimeout(() => setUnlockStep(2), 1500);
      const timer2 = setTimeout(() => setUnlockStep(3), 3000);
      const timer3 = setTimeout(() => setUnlockStep(4), 4500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setUnlockStep(0);
    }
  }, [isFingerPressed]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-8 mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-poppins">
          Real-World Applications
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Discover how basic electronic logic runs modern hardware and controls digital automation.
        </p>
      </div>

      {/* Grid of Interactive Application Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {appCards.map((card) => (
          <motion.div
            key={card.id}
            onClick={() => setSelectedCard(card)}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group cursor-pointer overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm transition-all"
          >
            <div className={`h-2.5 w-full bg-gradient-to-r ${card.color}`} />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-slate-700 group-hover:scale-105 transition-transform">
                  <card.icon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                </div>
                <h3 className="text-lg font-bold font-poppins text-slate-900 dark:text-white">{card.title}</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {card.desc}
              </p>
              <span className="text-xs font-semibold text-primary dark:text-blue-400 inline-flex items-center gap-1 group-hover:underline">
                Read Details
                <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Real-Life Story workflow: Smartphone Unlock */}
      <div className="glass p-8 rounded-2xl dark:bg-slate-800/50">
        <div className="max-w-3xl mb-8">
          <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-2">
            Story: How Unlocking Your Smartphone Uses Logic Gates
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Press and hold the fingerprint scanner below to trace the decision flow from sensor scan to desktop launch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Button scanner */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button
              onMouseDown={() => setIsFingerPressed(true)}
              onMouseUp={() => setIsFingerPressed(false)}
              onMouseLeave={() => setIsFingerPressed(false)}
              onTouchStart={() => setIsFingerPressed(true)}
              onTouchEnd={() => setIsFingerPressed(false)}
              className={`h-28 w-28 rounded-full border-4 flex items-center justify-center shadow-lg transition-all duration-300 ${
                isFingerPressed
                  ? "bg-primary border-primary text-white scale-95 shadow-primary/30"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:scale-105 hover:text-slate-600"
              }`}
            >
              <Fingerprint className={`h-16 w-16 ${isFingerPressed ? "animate-pulse" : ""}`} />
            </button>
            <span className="mt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">
              {isFingerPressed ? "Scanning Fingerprint..." : "Hold mouse click here"}
            </span>
          </div>

          {/* Right: Steps Timeline animation */}
          <div className="lg:col-span-8 space-y-4">
            {[
              {
                step: 1,
                label: "Fingerprint Scan",
                detail: "High-resolution sensor detects thermal ridges (Input A = 1).",
              },
              {
                step: 2,
                label: "Verification Matching",
                detail: "Security chip compares hashed signature with template (Input B = 1).",
              },
              {
                step: 3,
                label: "Decision (AND Gate)",
                detail: "Outputs Y = 1 only if Input A AND Input B are both validated.",
              },
              {
                step: 4,
                label: "Access Granted",
                detail: "Trigger flips the system display lock flag to active, unlocking your phone.",
              },
            ].map((stepItem) => {
              const isActive = unlockStep >= stepItem.step;
              const isCurrent = unlockStep === stepItem.step;

              return (
                <div
                  key={stepItem.step}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? "bg-primary/5 border-primary/30 dark:bg-primary/10"
                      : isActive
                      ? "bg-slate-50/50 border-slate-200 dark:bg-slate-800/30 dark:border-slate-750"
                      : "bg-transparent border-transparent opacity-40"
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-slate-200 text-slate-500 dark:bg-slate-800"
                    }`}
                  >
                    {isActive && unlockStep > stepItem.step ? <Check className="h-4 w-4" /> : stepItem.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-poppins text-slate-900 dark:text-white">
                      {stepItem.label}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {stepItem.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card Details Modal popup */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            >
              <div className={`h-3 w-full bg-gradient-to-r ${selectedCard.color}`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                      <selectedCard.icon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                    </div>
                    <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">
                      {selectedCard.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="p-1.5 rounded-lg text-slate-450 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                    {selectedCard.desc}
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">How it works</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed">
                      {selectedCard.detail}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
