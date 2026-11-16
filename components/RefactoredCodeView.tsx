"use client";

import { useState } from "react";
import { RefactoredCode } from "@/lib/types";

interface RefactoredCodeViewProps {
  original: string;
  refactored: RefactoredCode;
}

export default function RefactoredCodeView({ original, refactored }: RefactoredCodeViewProps) {
  const [view, setView] = useState<"refactored" | "original">("refactored");
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(refactored.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const originalLines = original.split("\n").length;
  const refactoredLines = refactored.code.split("\n").length;
  const lineDiff = refactoredLines - originalLines;

  return (
    <div>
      {/* Toolbar with BIG, CLEAR BUTTONS */}
      <div
        className="sticky top-0 px-5 py-4 border-b flex items-center justify-between gap-4 flex-wrap bg-slate-900/95 backdrop-blur-md"
        style={{ borderColor: "var(--card-border)", zIndex: 5 }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("refactored")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              view === "refactored"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20 border border-emerald-400"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            ✅ AI-Refactored Fix
          </button>

          <button
            onClick={() => setView("original")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              view === "original"
                ? "bg-red-600 text-white shadow-md shadow-red-500/20 border border-red-400"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            ❌ Original Code
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 text-xs font-semibold text-slate-400">
            <span>
              Lines: {originalLines} → {refactoredLines}{" "}
              <span className={lineDiff > 0 ? "text-amber-400" : "text-emerald-400"}>
                ({lineDiff > 0 ? `+${lineDiff}` : lineDiff})
              </span>
            </span>
          </div>

          {/* Large Copy Button */}
          <button
            onClick={copyCode}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer"
            style={{
              background: copied ? "rgba(16, 185, 129, 0.25)" : "rgba(255, 255, 255, 0.08)",
              color: copied ? "#34d399" : "#f1f5f9",
              border: `1px solid ${copied ? "rgba(16, 185, 129, 0.4)" : "#475569"}`,
            }}
          >
            <span>{copied ? "✓ Copied!" : "📋 Copy Fixed Code"}</span>
          </button>
        </div>
      </div>

      {/* Changes applied summary */}
      {refactored.changesSummary.length > 0 && (
        <div className="px-5 py-4 border-b bg-emerald-950/20" style={{ borderColor: "var(--card-border)" }}>
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
            ✨ Changes & Improvements Applied ({refactored.changesSummary.length}):
          </div>
          <div className="flex flex-wrap gap-2">
            {refactored.changesSummary.map((change, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
              >
                ✓ {change}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Code display */}
      <div className="relative">
        <pre
          className="code-editor p-5 overflow-auto text-sm leading-relaxed font-mono"
          style={{
            color: "#f8fafc",
            maxHeight: "500px",
            background: "rgba(0, 0, 0, 0.25)",
            margin: 0,
          }}
        >
          <code>{view === "refactored" ? refactored.code : original}</code>
        </pre>
      </div>
    </div>
  );
}
