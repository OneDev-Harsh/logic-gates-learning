"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Info, ChevronUp, ChevronDown } from "lucide-react";

interface SummaryRow {
  gate: string;
  nandCount: number;
  norCount: number;
}

const summaryData: SummaryRow[] = [
  { gate: "NOT", nandCount: 1, norCount: 1 },
  { gate: "AND", nandCount: 2, norCount: 3 },
  { gate: "OR", nandCount: 3, norCount: 2 },
  { gate: "XOR", nandCount: 4, norCount: 5 },
  { gate: "XNOR", nandCount: 5, norCount: 4 },
];

export default function UniversalGates() {
  const { visitPage } = useStore();
  const [activeTab, setActiveTab] = useState<"NAND" | "NOR">("NAND");
  const [selectedGate, setSelectedGate] = useState<string>("NOT");
  const [sortField, setSortField] = useState<"gate" | "nandCount" | "norCount">("gate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Inputs for simulation
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(false);

  useEffect(() => {
    visitPage("/universal-gates");
  }, [visitPage]);

  // Compute live logic output of the selected implementation
  const getLogicOutput = () => {
    switch (selectedGate) {
      case "NOT":
        return !inputA;
      case "AND":
        return inputA && inputB;
      case "OR":
        return inputA || inputB;
      case "XOR":
        return inputA !== inputB;
      case "XNOR":
        return inputA === inputB;
      default:
        return false;
    }
  };

  const output = getLogicOutput();

  const handleSort = (field: "gate" | "nandCount" | "norCount") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedData = [...summaryData].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = (bVal as string).toLowerCase();
    }

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Render SVG circuits
  const renderNANDImplementationSVG = () => {
    const strokeA = inputA ? "#10B981" : "#64748b";
    const strokeB = inputB ? "#10B981" : "#64748b";
    const strokeY = output ? "#10B981" : "#64748b";

    if (selectedGate === "NOT") {
      return (
        <svg viewBox="0 0 300 120" className="w-full max-w-[280px] h-auto">
          {/* Input lines splitting */}
          <path d="M 20 60 L 60 60 L 60 40 L 90 40 M 60 60 L 60 80 L 90 80" stroke={strokeA} strokeWidth="3" fill="none" />
          <line x1="150" y1="60" x2="250" y2="60" stroke={strokeY} strokeWidth="3" />
          {/* NAND Gate */}
          <g transform="translate(90, 20)">
            <path d="M 0 10 L 30 10 A 30 30 0 0 1 30 70 L 0 70 Z" fill="rgba(59,130,246,0.05)" stroke="#2563EB" strokeWidth="3" />
            <circle cx="37" cy="40" r="7" fill="white" stroke="#2563EB" strokeWidth="3" />
            <text x="18" y="44" fill="currentColor" className="text-slate-500 font-bold text-xs" textAnchor="middle">NAND</text>
          </g>
          {/* Indicators */}
          <circle cx="20" cy="60" r="8" fill={inputA ? "#10B981" : "#64748b"} />
          <circle cx="250" cy="60" r="8" fill={output ? "#10B981" : "#64748b"} />
          <text x="20" y="45" fill="currentColor" className="text-xs font-bold text-slate-400">A</text>
          <text x="250" y="45" fill="currentColor" className="text-xs font-bold text-slate-400">Y</text>
        </svg>
      );
    }

    if (selectedGate === "AND") {
      return (
        <svg viewBox="0 0 360 140" className="w-full max-w-[340px] h-auto">
          {/* Connections */}
          <line x1="20" y1="40" x2="80" y2="40" stroke={strokeA} strokeWidth="3" />
          <line x1="20" y1="100" x2="80" y2="100" stroke={strokeB} strokeWidth="3" />
          {/* Mid point line (NAND output) */}
          <line x1="140" y1="70" x2="200" y2="70" stroke={(!inputA || !inputB) ? "#10B981" : "#64748b"} strokeWidth="3" />
          {/* Split into second NAND */}
          <path d="M 200 70 L 200 50 L 220 50 M 200 70 L 200 90 L 220 90" stroke={(!inputA || !inputB) ? "#10B981" : "#64748b"} strokeWidth="3" fill="none" />
          <line x1="280" y1="70" x2="340" y2="70" stroke={strokeY} strokeWidth="3" />
          {/* NAND 1 */}
          <g transform="translate(80, 30)">
            <path d="M 0 10 L 30 10 A 30 30 0 0 1 30 70 L 0 70 Z" fill="rgba(59,130,246,0.05)" stroke="#2563EB" strokeWidth="3" />
            <circle cx="37" cy="40" r="7" fill="white" stroke="#2563EB" strokeWidth="3" />
          </g>
          {/* NAND 2 */}
          <g transform="translate(220, 30)">
            <path d="M 0 10 L 30 10 A 30 30 0 0 1 30 70 L 0 70 Z" fill="rgba(59,130,246,0.05)" stroke="#2563EB" strokeWidth="3" />
            <circle cx="37" cy="40" r="7" fill="white" stroke="#2563EB" strokeWidth="3" />
          </g>
        </svg>
      );
    }

    // Default placeholder message or generic visual for OR/XOR/XNOR
    return (
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl h-48 w-full text-center">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-350">
          Showing {selectedGate} gate implementation using {activeTab}
        </p>
        <p className="text-xs text-slate-450 mt-2">
          Uses {summaryData.find(g => g.gate === selectedGate)?.nandCount} NAND gates connected in series-parallel grids.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="px-2 py-1 text-xs font-mono font-bold bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400 rounded">
            Output Y = {output ? "1" : "0"}
          </span>
        </div>
      </div>
    );
  };

  const renderNORImplementationSVG = () => {
    const strokeA = inputA ? "#10B981" : "#64748b";
    const strokeY = output ? "#10B981" : "#64748b";

    if (selectedGate === "NOT") {
      return (
        <svg viewBox="0 0 300 120" className="w-full max-w-[280px] h-auto">
          {/* Input lines splitting */}
          <path d="M 20 60 L 60 60 L 60 40 L 90 40 M 60 60 L 60 80 L 90 80" stroke={strokeA} strokeWidth="3" fill="none" />
          <line x1="150" y1="60" x2="250" y2="60" stroke={strokeY} strokeWidth="3" />
          {/* NOR Gate */}
          <g transform="translate(90, 20)">
            <path d="M 0 10 C 10 10 25 15 50 40 C 25 65 10 70 0 70 C 10 50 10 30 0 10 Z" fill="rgba(59,130,246,0.05)" stroke="#2563EB" strokeWidth="3" />
            <circle cx="57" cy="40" r="7" fill="white" stroke="#2563EB" strokeWidth="3" />
            <text x="25" y="44" fill="currentColor" className="text-slate-500 font-bold text-xs" textAnchor="middle">NOR</text>
          </g>
          {/* Indicators */}
          <circle cx="20" cy="60" r="8" fill={inputA ? "#10B981" : "#64748b"} />
          <circle cx="250" cy="60" r="8" fill={output ? "#10B981" : "#64748b"} />
        </svg>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl h-48 w-full text-center">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-350">
          Showing {selectedGate} gate implementation using {activeTab}
        </p>
        <p className="text-xs text-slate-450 mt-2">
          Uses {summaryData.find(g => g.gate === selectedGate)?.norCount} NOR gates in grid configurations.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="px-2 py-1 text-xs font-mono font-bold bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400 rounded">
            Output Y = {output ? "1" : "0"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-8 mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-poppins">
          Universal Gates
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Discover why NAND and NOR gates can implement every other digital logic gates.
        </p>
      </div>

      {/* NAND vs NOR Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="glass p-6 rounded-2xl border-l-4 border-l-primary dark:bg-slate-800/50">
          <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            NAND Universal Gate
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
            Constructed by inverting an AND gate. Its versatility means it is widely used in high-density Flash memory cards and solid state drives (SSD).
          </p>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-350 list-disc list-inside">
            <li>Lower transistor counts in silicon chips.</li>
            <li>Faster propagation delays compared to equivalent configurations.</li>
          </ul>
        </div>

        <div className="glass p-6 rounded-2xl border-l-4 border-l-secondary dark:bg-slate-800/50">
          <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            NOR Universal Gate
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
            Constructed by inverting an OR gate. It offers high-speed reads and is common in storing bootloader code chips.
          </p>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-350 list-disc list-inside">
            <li>Guarantees high logic execution margins.</li>
            <li>Reliable code storage (EPROM/EEPROM).</li>
          </ul>
        </div>
      </div>

      {/* Interactive Implementation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Tab Selectors */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex">
            <button
              onClick={() => { setActiveTab("NAND"); setSelectedGate("NOT"); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold font-poppins transition-all ${
                activeTab === "NAND"
                  ? "bg-white dark:bg-slate-700 text-primary dark:text-white shadow"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              NAND Implementations
            </button>
            <button
              onClick={() => { setActiveTab("NOR"); setSelectedGate("NOT"); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold font-poppins transition-all ${
                activeTab === "NOR"
                  ? "bg-white dark:bg-slate-700 text-primary dark:text-white shadow"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              NOR Implementations
            </button>
          </div>

          <div className="space-y-2">
            {["NOT", "AND", "OR", "XOR", "XNOR"].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGate(g)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium font-poppins transition-all flex items-center justify-between ${
                  selectedGate === g
                    ? "bg-primary/5 text-primary border-primary/20 dark:bg-primary/10 dark:text-blue-400"
                    : "bg-slate-50 text-slate-600 border-slate-150 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-750"
                }`}
              >
                <span>Build {g} Gate</span>
                <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-md font-mono text-slate-600 dark:text-slate-400">
                  {activeTab === "NAND"
                    ? `${summaryData.find(d => d.gate === g)?.nandCount} NAND`
                    : `${summaryData.find(d => d.gate === g)?.norCount} NOR`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Diagram Sandbox */}
        <div className="lg:col-span-8">
          <div className="glass p-6 rounded-2xl dark:bg-slate-800/50 flex flex-col items-center justify-between min-h-[350px]">
            <div className="w-full flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-6">
              <h3 className="text-lg font-bold font-poppins text-slate-900 dark:text-white">
                {selectedGate} Built with {activeTab} Gates
              </h3>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Info className="h-3.5 w-3.5" />
                Live schematic simulation
              </span>
            </div>

            <div className="w-full flex justify-center py-6">
              {activeTab === "NAND" ? renderNANDImplementationSVG() : renderNORImplementationSVG()}
            </div>

            {/* Inputs Panel */}
            <div className="w-full bg-slate-50 dark:bg-slate-900 p-4 rounded-xl flex items-center justify-around">
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputA}
                    onChange={(e) => setInputA(e.target.checked)}
                    className="h-4.5 w-4.5 text-primary border-slate-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Input A = {inputA ? "1" : "0"}</span>
                </label>

                {selectedGate !== "NOT" && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inputB}
                      onChange={(e) => setInputB(e.target.checked)}
                      className="h-4.5 w-4.5 text-primary border-slate-300 rounded focus:ring-primary"
                    />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Input B = {inputB ? "1" : "0"}</span>
                  </label>
                )}
              </div>

              <div className="border-l border-slate-200 dark:border-slate-800 pl-6 flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Final Output</span>
                <span className={`px-3 py-1 font-mono font-bold text-sm rounded ${output ? "bg-success/10 text-success" : "bg-slate-200 text-slate-600 dark:bg-slate-850 dark:text-slate-400"}`}>
                  Y = {output ? "1" : "0"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Table with Sorting */}
      <div className="glass p-6 rounded-2xl dark:bg-slate-800/50">
        <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white mb-4">
          Universal Gate Conversion Summary Table
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-850 text-sm">
            <thead className="bg-slate-50 dark:bg-slate-850">
              <tr>
                <th
                  onClick={() => handleSort("gate")}
                  className="px-6 py-4 text-left font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <div className="flex items-center gap-1">
                    Target Gate
                    {sortField === "gate" && (sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("nandCount")}
                  className="px-6 py-4 text-left font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <div className="flex items-center gap-1">
                    NAND Gates Required
                    {sortField === "nandCount" && (sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("norCount")}
                  className="px-6 py-4 text-left font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <div className="flex items-center gap-1">
                    NOR Gates Required
                    {sortField === "norCount" && (sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-slate-100 dark:divide-slate-800">
              {sortedData.map((row) => (
                <tr
                  key={row.gate}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-4 font-bold font-poppins text-slate-800 dark:text-white">{row.gate}</td>
                  <td className="px-6 py-4 font-mono font-medium">{row.nandCount}</td>
                  <td className="px-6 py-4 font-mono font-medium">{row.norCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
