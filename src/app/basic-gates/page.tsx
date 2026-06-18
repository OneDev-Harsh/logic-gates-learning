"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { Cpu, Power, HelpCircle, Check, Info } from "lucide-react";

interface GateInfo {
  name: string;
  definition: string;
  expression: string;
  example: string;
  inputs: number;
}

const gates: Record<string, GateInfo> = {
  AND: {
    name: "AND Gate",
    definition: "The output is HIGH (1) only if ALL inputs are HIGH (1). If any input is LOW (0), the output is LOW.",
    expression: "Y = A • B",
    example: "A safety system on a machine where two start buttons must be pressed simultaneously to operate.",
    inputs: 2,
  },
  OR: {
    name: "OR Gate",
    definition: "The output is HIGH (1) if AT LEAST ONE input is HIGH (1). The output is LOW (0) only when all inputs are LOW.",
    expression: "Y = A + B",
    example: "A home security alarm that triggers if either the front door OR the back door is opened.",
    inputs: 2,
  },
  NOT: {
    name: "NOT Gate (Inverter)",
    definition: "The output is the OPPOSITE (inversion) of the input. It turns a HIGH (1) to LOW (0), and vice versa.",
    expression: "Y = A'",
    example: "An automatic night light that turns ON when the sensor detects no light (darkness).",
    inputs: 1,
  },
};

export default function BasicGates() {
  const { visitPage } = useStore();
  const [selectedGate, setSelectedGate] = useState<"AND" | "OR" | "NOT">("AND");
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(false);

  useEffect(() => {
    visitPage("/basic-gates");
  }, [visitPage]);

  // Compute output
  const getOutput = () => {
    switch (selectedGate) {
      case "AND":
        return inputA && inputB;
      case "OR":
        return inputA || inputB;
      case "NOT":
        return !inputA;
      default:
        return false;
    }
  };

  const output = getOutput();
  const currentGate = gates[selectedGate];

  // Render SVG Gate Symbol
  const renderGateSVG = () => {
    const color = output ? "#10B981" : "#3b82f6";
    const fill = output ? "rgba(16, 185, 129, 0.1)" : "rgba(59, 130, 246, 0.05)";

    if (selectedGate === "AND") {
      return (
        <svg viewBox="0 0 300 160" className="w-full max-w-[280px] h-auto drop-shadow-md">
          {/* Input lines */}
          <line x1="20" y1="50" x2="100" y2="50" stroke={inputA ? "#10B981" : "#64748b"} strokeWidth="4" />
          <line x1="20" y1="110" x2="100" y2="110" stroke={inputB ? "#10B981" : "#64748b"} strokeWidth="4" />
          {/* Output line */}
          <line x1="200" y1="80" x2="280" y2="80" stroke={output ? "#10B981" : "#64748b"} strokeWidth="4" />
          {/* Gate body */}
          <path d="M 100 30 L 150 30 A 50 50 0 0 1 150 130 L 100 130 Z" fill={fill} stroke={color} strokeWidth="4" />
          {/* Labels */}
          <text x="10" y="40" fill="currentColor" className="text-slate-500 font-bold text-xs">A</text>
          <text x="10" y="125" fill="currentColor" className="text-slate-500 font-bold text-xs">B</text>
          <text x="285" y="75" fill="currentColor" className="text-slate-500 font-bold text-xs">Y</text>
          <text x="140" y="85" fill="currentColor" className="text-slate-800 dark:text-white font-bold text-sm" textAnchor="middle">AND</text>
          {/* Interactive values */}
          <circle cx="20" cy="50" r="10" fill={inputA ? "#10B981" : "#64748b"} />
          <text x="20" y="54" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{inputA ? 1 : 0}</text>
          <circle cx="20" cy="110" r="10" fill={inputB ? "#10B981" : "#64748b"} />
          <text x="20" y="114" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{inputB ? 1 : 0}</text>
          <circle cx="280" cy="80" r="10" fill={output ? "#10B981" : "#64748b"} />
          <text x="280" y="84" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{output ? 1 : 0}</text>
        </svg>
      );
    }

    if (selectedGate === "OR") {
      return (
        <svg viewBox="0 0 300 160" className="w-full max-w-[280px] h-auto drop-shadow-md">
          {/* Input lines */}
          <line x1="20" y1="50" x2="100" y2="50" stroke={inputA ? "#10B981" : "#64748b"} strokeWidth="4" />
          <line x1="20" y1="110" x2="100" y2="110" stroke={inputB ? "#10B981" : "#64748b"} strokeWidth="4" />
          {/* Output line */}
          <line x1="205" y1="80" x2="280" y2="80" stroke={output ? "#10B981" : "#64748b"} strokeWidth="4" />
          {/* Gate body */}
          <path d="M 100 30 C 120 30 150 40 205 80 C 150 120 120 130 100 130 C 115 100 115 60 100 30 Z" fill={fill} stroke={color} strokeWidth="4" />
          {/* Labels */}
          <text x="10" y="40" fill="currentColor" className="text-slate-500 font-bold text-xs">A</text>
          <text x="10" y="125" fill="currentColor" className="text-slate-500 font-bold text-xs">B</text>
          <text x="285" y="75" fill="currentColor" className="text-slate-500 font-bold text-xs">Y</text>
          <text x="145" y="85" fill="currentColor" className="text-slate-800 dark:text-white font-bold text-sm" textAnchor="middle">OR</text>
          {/* Interactive values */}
          <circle cx="20" cy="50" r="10" fill={inputA ? "#10B981" : "#64748b"} />
          <text x="20" y="54" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{inputA ? 1 : 0}</text>
          <circle cx="20" cy="110" r="10" fill={inputB ? "#10B981" : "#64748b"} />
          <text x="20" y="114" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{inputB ? 1 : 0}</text>
          <circle cx="280" cy="80" r="10" fill={output ? "#10B981" : "#64748b"} />
          <text x="280" y="84" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{output ? 1 : 0}</text>
        </svg>
      );
    }

    // NOT gate
    return (
      <svg viewBox="0 0 300 160" className="w-full max-w-[280px] h-auto drop-shadow-md">
        {/* Input line */}
        <line x1="20" y1="80" x2="100" y2="80" stroke={inputA ? "#10B981" : "#64748b"} strokeWidth="4" />
        {/* Output line */}
        <line x1="210" y1="80" x2="280" y2="80" stroke={output ? "#10B981" : "#64748b"} strokeWidth="4" />
        {/* Gate body */}
        <path d="M 100 40 L 190 80 L 100 120 Z" fill={fill} stroke={color} strokeWidth="4" />
        {/* Inversion circle */}
        <circle cx="200" cy="80" r="8" fill="white" className="dark:fill-slate-800" stroke={color} strokeWidth="4" />
        {/* Labels */}
        <text x="10" y="70" fill="currentColor" className="text-slate-500 font-bold text-xs">A</text>
        <text x="285" y="75" fill="currentColor" className="text-slate-500 font-bold text-xs">Y</text>
        <text x="135" y="85" fill="currentColor" className="text-slate-800 dark:text-white font-bold text-xs" textAnchor="middle">NOT</text>
        {/* Interactive values */}
        <circle cx="20" cy="80" r="10" fill={inputA ? "#10B981" : "#64748b"} />
        <text x="20" y="84" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{inputA ? 1 : 0}</text>
        <circle cx="280" cy="80" r="10" fill={output ? "#10B981" : "#64748b"} />
        <text x="280" y="84" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{output ? 1 : 0}</text>
      </svg>
    );
  };

  // Truth Table Generator
  const truthTables = {
    AND: [
      { a: 0, b: 0, y: 0 },
      { a: 0, b: 1, y: 0 },
      { a: 1, b: 0, y: 0 },
      { a: 1, b: 1, y: 1 },
    ],
    OR: [
      { a: 0, b: 0, y: 0 },
      { a: 0, b: 1, y: 1 },
      { a: 1, b: 0, y: 1 },
      { a: 1, b: 1, y: 1 },
    ],
    NOT: [
      { a: 0, y: 1 },
      { a: 1, y: 0 },
    ],
  };

  const isRowActive = (row: { a: number; b?: number; y: number }) => {
    if (selectedGate === "NOT") {
      return row.a === (inputA ? 1 : 0);
    }
    return row.a === (inputA ? 1 : 0) && row.b === (inputB ? 1 : 0);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-8 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-poppins">
            Basic Logic Gates
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Understand and simulate the foundations: AND, OR, and NOT gates.
          </p>
        </div>
        {/* Gate Switcher tabs */}
        <div className="flex gap-2 mt-4 md:mt-0 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {(["AND", "OR", "NOT"] as const).map((g) => (
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
        <div className="lg:col-span-7 space-y-8">
          {/* Description Card */}
          <div className="glass p-6 rounded-2xl dark:bg-slate-800/50">
            <h2 className="text-2xl font-bold font-poppins mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="h-6 w-6 text-primary" />
              {currentGate.name}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {currentGate.definition}
            </p>
            <div className="flex flex-wrap gap-4 border-t border-slate-100 dark:border-slate-700 pt-4">
              <div>
                <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Boolean Expression</span>
                <code className="text-lg font-mono font-extrabold text-primary dark:text-blue-400">{currentGate.expression}</code>
              </div>
            </div>
          </div>

          {/* Animated Truth Table */}
          <div className="glass p-6 rounded-2xl dark:bg-slate-800/50 overflow-hidden">
            <h3 className="text-xl font-bold font-poppins mb-4 text-slate-900 dark:text-white">
              Truth Table
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-850">
                <thead className="bg-slate-50 dark:bg-slate-800/40">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Input A</th>
                    {selectedGate !== "NOT" && (
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Input B</th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Output Y</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-slate-100 dark:divide-slate-800">
                  {truthTables[selectedGate].map((row: { a: number; b?: number; y: number }, idx: number) => {
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
                        {selectedGate !== "NOT" && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{row.b}</td>
                        )}
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
            <p className="mt-3 text-xs text-slate-400 italic flex items-center gap-1">
              <Info className="h-3.5 w-3.5" />
              The highlighted row corresponds directly to the active simulation inputs.
            </p>
          </div>
        </div>

        {/* Right Column: Simulation Sandbox */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass p-6 rounded-2xl dark:bg-slate-800/50 flex flex-col items-center justify-between h-full min-h-[400px]">
            <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white self-start w-full border-b border-slate-100 dark:border-slate-800 pb-3 mb-6">
              Interactive Simulation
            </h3>

            {/* Simulated Circuit Component */}
            <div className="my-8 flex justify-center items-center w-full">
              {renderGateSVG()}
            </div>

            {/* Input Switches Control Panel */}
            <div className="w-full bg-slate-50 dark:bg-slate-850 p-4 rounded-xl space-y-4">
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

                {selectedGate !== "NOT" && (
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
                )}
              </div>
            </div>
          </div>

          {/* Real Life Example Card */}
          <div className="glass p-6 rounded-2xl dark:bg-slate-800/50">
            <h4 className="text-md font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <HelpCircle className="h-4.5 w-4.5 text-accent" />
              Real-Life Application Example
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {currentGate.example}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
