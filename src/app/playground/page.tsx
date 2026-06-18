"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Play, RotateCcw, Power, Cpu } from "lucide-react";

interface PlaygroundGate {
  id: string;
  name: string;
  expression: string;
  inputs: number;
}

const playgroundGates: PlaygroundGate[] = [
  { id: "AND", name: "AND Gate", expression: "Y = A • B", inputs: 2 },
  { id: "OR", name: "OR Gate", expression: "Y = A + B", inputs: 2 },
  { id: "NOT", name: "NOT Gate", expression: "Y = A'", inputs: 1 },
  { id: "NAND", name: "NAND Gate", expression: "Y = (A • B)'", inputs: 2 },
  { id: "NOR", name: "NOR Gate", expression: "Y = (A + B)'", inputs: 2 },
  { id: "XOR", name: "XOR Gate", expression: "Y = A ⊕ B", inputs: 2 },
  { id: "XNOR", name: "XNOR Gate", expression: "Y = A ⊙ B", inputs: 2 },
];

export default function CircuitPlayground() {
  const { visitPage } = useStore();
  const [selectedGate, setSelectedGate] = useState<string>("AND");
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(false);

  useEffect(() => {
    visitPage("/playground");
  }, [visitPage]);

  const gateInfo = playgroundGates.find((g) => g.id === selectedGate) || playgroundGates[0];

  const calculateOutput = () => {
    switch (selectedGate) {
      case "AND":
        return inputA && inputB;
      case "OR":
        return inputA || inputB;
      case "NOT":
        return !inputA;
      case "NAND":
        return !(inputA && inputB);
      case "NOR":
        return !(inputA || inputB);
      case "XOR":
        return inputA !== inputB;
      case "XNOR":
        return inputA === inputB;
      default:
        return false;
    }
  };

  const output = calculateOutput();

  const handleReset = () => {
    setInputA(false);
    setInputB(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-poppins flex items-center gap-2">
            <Play className="h-8 w-8 text-primary animate-pulse" />
            Circuit Playground
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Experiment with all seven logic gates, toggle inputs, and inspect live outputs.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="mt-4 md:mt-0 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 font-semibold text-sm flex items-center gap-1.5 transition-all"
        >
          <RotateCcw className="h-4.5 w-4.5" />
          Reset Inputs
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Selection Grid */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Choose a Gate</span>
          <div className="grid grid-cols-1 gap-2">
            {playgroundGates.map((gate) => (
              <button
                key={gate.id}
                onClick={() => setSelectedGate(gate.id)}
                className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-semibold font-poppins transition-all flex items-center justify-between ${
                  selectedGate === gate.id
                    ? "bg-primary/5 text-primary border-primary/20 dark:bg-primary/10 dark:text-blue-400"
                    : "bg-slate-50 text-slate-600 border-slate-150 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-750"
                }`}
              >
                <span>{gate.name}</span>
                <code className="text-xs px-2 py-0.5 bg-slate-200 dark:bg-slate-705 rounded font-mono text-slate-500 dark:text-slate-400">
                  {gate.expression}
                </code>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Live Interactive Simulator */}
        <div className="lg:col-span-8">
          <div className="glass p-6 rounded-2xl dark:bg-slate-800/50 flex flex-col justify-between h-full min-h-[450px]">
            <div className="w-full flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-6">
              <h3 className="text-lg font-bold font-poppins text-slate-900 dark:text-white">
                Live Simulator Sandbox ({gateInfo.name})
              </h3>
              <span className="text-xs text-primary dark:text-blue-400 font-mono font-bold">
                {gateInfo.expression}
              </span>
            </div>

            {/* Simulated schematic */}
            <div className="flex-1 flex flex-col items-center justify-center py-8">
              <div className="relative p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-inner flex flex-col items-center justify-center w-full max-w-md">
                
                {/* Simulated Signal Flow */}
                <div className="flex items-center gap-12 my-6 font-mono text-lg">
                  {/* Inputs */}
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase">A</span>
                      <span className={`px-3 py-1.5 rounded-lg border font-bold ${inputA ? "bg-success text-white border-success shadow-md shadow-success/10" : "bg-slate-200 text-slate-650 dark:bg-slate-850 dark:border-slate-750 dark:text-slate-350"}`}>
                        {inputA ? "1" : "0"}
                      </span>
                    </div>

                    {gateInfo.inputs === 2 && (
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase">B</span>
                        <span className={`px-3 py-1.5 rounded-lg border font-bold ${inputB ? "bg-success text-white border-success shadow-md shadow-success/10" : "bg-slate-200 text-slate-650 dark:bg-slate-850 dark:border-slate-750 dark:text-slate-350"}`}>
                          {inputB ? "1" : "0"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Connecting indicator */}
                  <div className="text-primary font-extrabold text-xl animate-pulse">➔</div>

                  {/* Gate Display */}
                  <div className="px-6 py-4 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10 text-primary dark:text-blue-400 font-bold font-poppins flex flex-col items-center">
                    <Cpu className="h-8 w-8 mb-1" />
                    <span>{gateInfo.id}</span>
                  </div>

                  {/* Connecting indicator */}
                  <div className="text-primary font-extrabold text-xl animate-pulse">➔</div>

                  {/* Output */}
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">Output Y</span>
                    <span className={`px-4 py-2 rounded-lg border font-extrabold text-xl ${output ? "bg-success text-white border-success shadow-md shadow-success/20" : "bg-slate-200 text-slate-650 dark:bg-slate-850 dark:border-slate-750 dark:text-slate-350"}`}>
                      {output ? "1" : "0"}
                    </span>
                  </div>
                </div>

                <p className="text-xxs text-slate-450 italic mt-2 text-center">
                  Output changes dynamically when you toggle the input controls below.
                </p>
              </div>
            </div>

            {/* Inputs Panel */}
            <div className="w-full bg-slate-50 dark:bg-slate-900 p-4 rounded-xl mt-6">
              <span className="text-xs text-slate-450 font-bold block uppercase tracking-wider mb-3">Controls</span>
              <div className="flex justify-around items-center">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Input A</span>
                  <button
                    onClick={() => setInputA(!inputA)}
                    className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all border ${
                      inputA
                        ? "bg-success text-white border-success shadow-md shadow-success/20 scale-105"
                        : "bg-slate-200 text-slate-650 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-650"
                    }`}
                  >
                    <Power className="h-5 w-5" />
                  </button>
                </div>

                {gateInfo.inputs === 2 && (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Input B</span>
                    <button
                      onClick={() => setInputB(!inputB)}
                      className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all border ${
                        inputB
                          ? "bg-success text-white border-success shadow-md shadow-success/20 scale-105"
                          : "bg-slate-200 text-slate-650 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-650"
                      }`}
                    >
                      <Power className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
