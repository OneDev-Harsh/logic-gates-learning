"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Power, Check, Lock, Unlock, ShieldAlert, CheckCircle2 } from "lucide-react";

interface SpecialGateInfo {
  name: string;
  definition: string;
  expression: string;
  formulaText: string;
  example: string;
  inputs: number;
}

const specialGates: Record<string, SpecialGateInfo> = {
  XOR: {
    name: "XOR Gate (Exclusive OR)",
    definition: "The output is HIGH (1) if and only if the inputs are DIFFERENT. If inputs are the same, the output is LOW (0).",
    expression: "Y = A ⊕ B",
    formulaText: "Y = A'B + AB'",
    example: "Password check systems where mismatching entries authenticate correctly only when exactly one mismatch occurs (or parity checks). Or a staircase light switch controlled by two separate switches.",
    inputs: 2,
  },
  XNOR: {
    name: "XNOR Gate (Exclusive NOR)",
    definition: "The output is HIGH (1) if and only if the inputs are the SAME. If the inputs are different, the output is LOW (0).",
    expression: "Y = A ⊙ B",
    formulaText: "Y = AB + A'B'",
    example: "Digital parity and comparator circuits used to check if two multi-bit binary strings match exactly.",
    inputs: 2,
  },
};

export default function SpecialGates() {
  const { visitPage } = useStore();
  const [selectedGate, setSelectedGate] = useState<"XOR" | "XNOR">("XOR");
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(false);

  useEffect(() => {
    visitPage("/special-gates");
  }, [visitPage]);

  const getOutput = () => {
    if (selectedGate === "XOR") {
      return inputA !== inputB;
    } else {
      return inputA === inputB;
    }
  };

  const output = getOutput();
  const currentGate = specialGates[selectedGate];

  // Render Gate Symbol SVG
  const renderGateSVG = () => {
    const color = output ? "#10B981" : "#3b82f6";
    const fill = output ? "rgba(16, 185, 129, 0.1)" : "rgba(59, 130, 246, 0.05)";

    if (selectedGate === "XOR") {
      return (
        <svg viewBox="0 0 300 160" className="w-full max-w-[280px] h-auto drop-shadow-md">
          {/* Input lines */}
          <line x1="20" y1="50" x2="90" y2="50" stroke={inputA ? "#10B981" : "#64748b"} strokeWidth="4" />
          <line x1="20" y1="110" x2="90" y2="110" stroke={inputB ? "#10B981" : "#64748b"} strokeWidth="4" />
          {/* Output line */}
          <line x1="210" y1="80" x2="280" y2="80" stroke={output ? "#10B981" : "#64748b"} strokeWidth="4" />
          {/* Gate body with the extra back curve */}
          <path d="M 85 30 C 100 60 100 100 85 130" fill="none" stroke={color} strokeWidth="4" />
          <path d="M 95 30 C 115 30 145 40 210 80 C 145 120 115 130 95 130 C 110 100 110 60 95 30 Z" fill={fill} stroke={color} strokeWidth="4" />
          {/* Labels */}
          <text x="10" y="40" fill="currentColor" className="text-slate-500 font-bold text-xs">A</text>
          <text x="10" y="125" fill="currentColor" className="text-slate-500 font-bold text-xs">B</text>
          <text x="285" y="75" fill="currentColor" className="text-slate-500 font-bold text-xs">Y</text>
          <text x="145" y="85" fill="currentColor" className="text-slate-800 dark:text-white font-bold text-sm" textAnchor="middle">XOR</text>
          {/* Switch labels */}
          <circle cx="20" cy="50" r="10" fill={inputA ? "#10B981" : "#64748b"} />
          <text x="20" y="54" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{inputA ? 1 : 0}</text>
          <circle cx="20" cy="110" r="10" fill={inputB ? "#10B981" : "#64748b"} />
          <text x="20" y="114" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{inputB ? 1 : 0}</text>
          <circle cx="280" cy="80" r="10" fill={output ? "#10B981" : "#64748b"} />
          <text x="280" y="84" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{output ? 1 : 0}</text>
        </svg>
      );
    }

    // XNOR gate (OR + back curve + bubble)
    return (
      <svg viewBox="0 0 300 160" className="w-full max-w-[280px] h-auto drop-shadow-md">
        {/* Input lines */}
        <line x1="20" y1="50" x2="90" y2="50" stroke={inputA ? "#10B981" : "#64748b"} strokeWidth="4" />
        <line x1="20" y1="110" x2="90" y2="110" stroke={inputB ? "#10B981" : "#64748b"} strokeWidth="4" />
        {/* Output line */}
        <line x1="220" y1="80" x2="280" y2="80" stroke={output ? "#10B981" : "#64748b"} strokeWidth="4" />
        {/* Gate body with the extra back curve */}
        <path d="M 85 30 C 100 60 100 100 85 130" fill="none" stroke={color} strokeWidth="4" />
        <path d="M 95 30 C 115 30 145 40 200 80 C 145 120 115 130 95 130 C 110 100 110 60 95 30 Z" fill={fill} stroke={color} strokeWidth="4" />
        <circle cx="208" cy="80" r="8" fill="white" className="dark:fill-slate-800" stroke={color} strokeWidth="4" />
        {/* Labels */}
        <text x="10" y="40" fill="currentColor" className="text-slate-500 font-bold text-xs">A</text>
        <text x="10" y="125" fill="currentColor" className="text-slate-500 font-bold text-xs">B</text>
        <text x="285" y="75" fill="currentColor" className="text-slate-500 font-bold text-xs">Y</text>
        <text x="140" y="85" fill="currentColor" className="text-slate-800 dark:text-white font-bold text-sm" textAnchor="middle">XNOR</text>
        {/* Switch labels */}
        <circle cx="20" cy="50" r="10" fill={inputA ? "#10B981" : "#64748b"} />
        <text x="20" y="54" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{inputA ? 1 : 0}</text>
        <circle cx="20" cy="110" r="10" fill={inputB ? "#10B981" : "#64748b"} />
        <text x="20" y="114" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{inputB ? 1 : 0}</text>
        <circle cx="280" cy="80" r="10" fill={output ? "#10B981" : "#64748b"} />
        <text x="280" y="84" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{output ? 1 : 0}</text>
      </svg>
    );
  };

  // Truth Tables
  const truthTables = {
    XOR: [
      { a: 0, b: 0, y: 0 },
      { a: 0, b: 1, y: 1 },
      { a: 1, b: 0, y: 1 },
      { a: 1, b: 1, y: 0 },
    ],
    XNOR: [
      { a: 0, b: 0, y: 1 },
      { a: 0, b: 1, y: 0 },
      { a: 1, b: 0, y: 0 },
      { a: 1, b: 1, y: 1 },
    ],
  };

  const isRowActive = (row: { a: number; b: number; y: number }) => {
    return row.a === (inputA ? 1 : 0) && row.b === (inputB ? 1 : 0);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-8 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-poppins">
            Special Logic Gates
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Learn XOR and XNOR gates, with animated digital comparators and password verification dashboards.
          </p>
        </div>
        {/* Gate Switcher Tabs */}
        <div className="flex gap-2 mt-4 md:mt-0 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {(["XOR", "XNOR"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGate(g)}
              className={`px-4 py-2 rounded-lg font-poppins font-semibold text-sm transition-all ${
                selectedGate === g
                  ? "bg-white dark:bg-slate-700 text-primary dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              {g} Gate
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Details & Truth Table */}
        <div className="lg:col-span-6 space-y-8">
          <div className="glass p-6 rounded-2xl dark:bg-slate-800/50">
            <h2 className="text-2xl font-bold font-poppins mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="h-6 w-6 text-primary" />
              {currentGate.name}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {currentGate.definition}
            </p>
            <div className="flex flex-wrap gap-6 border-t border-slate-100 dark:border-slate-700 pt-4">
              <div>
                <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Boolean Expression</span>
                <code className="text-lg font-mono font-extrabold text-primary dark:text-blue-400">{currentGate.expression}</code>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Equivalent Formula</span>
                <code className="text-sm font-mono text-slate-600 dark:text-slate-300">{currentGate.formulaText}</code>
              </div>
            </div>
          </div>

          {/* Truth Table */}
          <div className="glass p-6 rounded-2xl dark:bg-slate-800/50">
            <h3 className="text-xl font-bold font-poppins mb-4 text-slate-900 dark:text-white">Truth Table</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-850">
                <thead className="bg-slate-50 dark:bg-slate-800/40">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Input A</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Input B</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Output Y</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-slate-100 dark:divide-slate-800">
                  {truthTables[selectedGate].map((row, idx) => {
                    const active = isRowActive(row);
                    return (
                      <motion.tr
                        key={idx}
                        animate={{
                          backgroundColor: active ? "rgba(37, 99, 235, 0.08)" : "transparent",
                          fontWeight: active ? "700" : "400",
                        }}
                        className={`transition-colors duration-150 ${active ? "text-primary dark:text-blue-400 font-bold" : "text-slate-600 dark:text-slate-300"}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{row.a}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{row.b}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono flex items-center gap-2">
                          {row.y}
                          {active && <Check className="h-4 w-4 text-success" />}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Simulation Sandbox & Live Scenario Animations */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass p-6 rounded-2xl dark:bg-slate-800/50 flex flex-col items-center justify-between h-full min-h-[350px]">
            <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white self-start w-full border-b border-slate-100 dark:border-slate-800 pb-3 mb-6">
              Simulation Sandbox
            </h3>

            {/* Simulated Logic Drawing */}
            <div className="my-6 flex justify-center items-center w-full">
              {renderGateSVG()}
            </div>

            {/* Inputs Control Panel */}
            <div className="w-full bg-slate-50 dark:bg-slate-850 p-4 rounded-xl">
              <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider mb-2">Controls</span>
              <div className="flex justify-around items-center">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Input A</span>
                  <button
                    onClick={() => setInputA(!inputA)}
                    className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all border ${
                      inputA
                        ? "bg-success text-white border-success shadow-md shadow-success/20 scale-105"
                        : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-650"
                    }`}
                  >
                    <Power className="h-5 w-5" />
                  </button>
                  <span className="font-mono text-sm font-bold">{inputA ? "HIGH (1)" : "LOW (0)"}</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Input B</span>
                  <button
                    onClick={() => setInputB(!inputB)}
                    className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all border ${
                      inputB
                        ? "bg-success text-white border-success shadow-md shadow-success/20 scale-105"
                        : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-650"
                    }`}
                  >
                    <Power className="h-5 w-5" />
                  </button>
                  <span className="font-mono text-sm font-bold">{inputB ? "HIGH (1)" : "LOW (0)"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Animated Real-World Demonstration Card */}
          <div className="glass p-6 rounded-2xl dark:bg-slate-800/50">
            {selectedGate === "XOR" ? (
              // XOR Password Verification Animation
              <div className="space-y-4">
                <h4 className="text-md font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
                  <Lock className="h-4.5 w-4.5 text-accent animate-pulse" />
                  XOR Real-World Animation: Password Verification
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Password check uses XOR logic to flag mismatches. In parity logic: if inputs are different (e.g. Password vs Entered Password mismatch), output is 1 (Access Denied / Flag Raised). Only when inputs match exactly (different outputs are 0) is the error flag low, granting access!
                </p>

                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-slate-400 font-medium">Original</span>
                      <span className="font-mono text-sm font-bold px-3 py-1 bg-white dark:bg-slate-800 rounded shadow-sm border dark:border-slate-700">
                        {inputA ? "🔑 Secret1" : "🔑 Secret0"}
                      </span>
                    </div>
                    <span className="text-primary font-bold">VS</span>
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-slate-400 font-medium">Entered</span>
                      <span className="font-mono text-sm font-bold px-3 py-1 bg-white dark:bg-slate-800 rounded shadow-sm border dark:border-slate-700">
                        {inputB ? "🔑 Secret1" : "🔑 Secret0"}
                      </span>
                    </div>
                  </div>

                  {/* Access Status Panel */}
                  <AnimatePresence mode="wait">
                    {output ? (
                      // XOR output is 1 (Access Denied - inputs different)
                      <motion.div
                        key="denied"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-2 text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/20 px-4 py-2 rounded-xl"
                      >
                        <ShieldAlert className="h-5 w-5" />
                        <span>MISMISTACH DETECTED - ACCESS DENIED</span>
                      </motion.div>
                    ) : (
                      // XOR output is 0 (Access Granted - inputs same)
                      <motion.div
                        key="granted"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-2 text-success font-bold bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2 rounded-xl"
                      >
                        <Unlock className="h-5 w-5" />
                        <span>PASSWORDS MATCH - ACCESS GRANTED</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              // XNOR Digital Comparator Animation
              <div className="space-y-4">
                <h4 className="text-md font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-accent" />
                  XNOR Real-World Animation: Digital Comparator
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  XNOR gates compare binary digits. If two bits are equal (both 0 or both 1), the XNOR gate outputs 1 (Equality Confirmed). If they are different, it outputs 0.
                </p>

                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-4 mb-4 font-mono text-xl">
                    <span className={`px-4 py-2 rounded-lg ${inputA ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white"}`}>
                      {inputA ? "1" : "0"}
                    </span>
                    <span className="text-slate-400 font-bold">===</span>
                    <span className={`px-4 py-2 rounded-lg ${inputB ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white"}`}>
                      {inputB ? "1" : "0"}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    {output ? (
                      <motion.div
                        key="equal"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center gap-2 text-success font-bold bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2 rounded-xl"
                      >
                        <Check className="h-5 w-5" />
                        <span>VALUES EQUAL (Output = 1)</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="notequal"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center gap-2 text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/20 px-4 py-2 rounded-xl"
                      >
                        <ShieldAlert className="h-5 w-5" />
                        <span>VALUES NOT EQUAL (Output = 0)</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
