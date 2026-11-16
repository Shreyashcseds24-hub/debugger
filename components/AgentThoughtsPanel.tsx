"use client";

import { useState } from "react";
import { AgentThought } from "@/lib/types";

interface AgentThoughtsPanelProps {
  thoughts: AgentThought[];
}

export default function AgentThoughtsPanel({ thoughts }: AgentThoughtsPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "var(--card)",
        border: "1px solid var(--card-border)",
      }}
    >
      {/* Header */}
      <button
        className="w-full px-5 py-4 flex items-center justify-between"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
          >
            🧠
          </div>
          <div className="text-left">
            <h3 className="font-bold" style={{ color: "#e2e8f0" }}>
              Agent Reasoning Trace
            </h3>
            <p className="text-xs" style={{ color: "#64748b" }}>
              {thoughts.length} agents · ReAct framework · Observe → Think → Act
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{ background: "rgba(139,92,246,0.1)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.2)" }}
          >
            Agentic AI
          </span>
          <span
            className="text-sm transition-transform"
            style={{ color: "#64748b", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▼
          </span>
        </div>
      </button>

      {expanded && (
        <div className="border-t" style={{ borderColor: "var(--card-border)" }}>
          {/* Timeline */}
          <div className="p-5">
            <div className="relative">
              {/* Connecting line */}
              <div
                className="absolute left-6 top-6 bottom-6 w-0.5"
                style={{ background: "linear-gradient(to bottom, #3b82f6, #8b5cf6)" }}
              />

              <div className="space-y-4">
                {thoughts.map((thought, idx) => (
                  <div key={idx} className="flex gap-4">
                    {/* Step bubble */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 cursor-pointer transition-transform hover:scale-110"
                      style={{
                        background: selected === idx
                          ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                          : "rgba(59,130,246,0.15)",
                        border: `2px solid ${selected === idx ? "#3b82f6" : "rgba(59,130,246,0.3)"}`,
                        boxShadow: selected === idx ? "0 0 15px rgba(59,130,246,0.4)" : "none",
                      }}
                      onClick={() => setSelected(selected === idx ? null : idx)}
                    >
                      <span className="text-xl">{thought.agent.split(" ")[0]}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="p-4 rounded-xl cursor-pointer transition-all"
                        style={{
                          background: selected === idx
                            ? "rgba(59,130,246,0.08)"
                            : "rgba(255,255,255,0.03)",
                          border: `1px solid ${selected === idx ? "rgba(59,130,246,0.2)" : "var(--card-border)"}`,
                        }}
                        onClick={() => setSelected(selected === idx ? null : idx)}
                      >
                        {/* Agent name & timestamp */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm" style={{ color: "#60a5fa" }}>
                            {thought.agent}
                          </span>
                          <span className="text-xs" style={{ color: "#334155" }}>
                            Step {thought.step} · {new Date(thought.timestamp).toLocaleTimeString()}
                          </span>
                        </div>

                        {/* ReAct labels */}
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          <div>
                            <div
                              className="text-xs font-semibold uppercase tracking-wider mb-1"
                              style={{ color: "#475569" }}
                            >
                              🎯 Action
                            </div>
                            <p className="text-sm" style={{ color: "#cbd5e1" }}>
                              {thought.action}
                            </p>
                          </div>
                          <div>
                            <div
                              className="text-xs font-semibold uppercase tracking-wider mb-1"
                              style={{ color: "#475569" }}
                            >
                              👁️ Observation
                            </div>
                            <p className="text-sm" style={{ color: "#94a3b8" }}>
                              {thought.observation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ReAct Framework explanation */}
          <div
            className="mx-5 mb-5 p-4 rounded-xl"
            style={{
              background: "rgba(139,92,246,0.05)",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg">🤖</span>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: "#a78bfa" }}>
                  ReAct (Reasoning + Acting) Framework
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>
                  This system uses the{" "}
                  <strong style={{ color: "#94a3b8" }}>ReAct agentic pattern</strong> where each specialized
                  AI agent follows: <strong style={{ color: "#94a3b8" }}>Observe</strong> (understand the code context) →{" "}
                  <strong style={{ color: "#94a3b8" }}>Think</strong> (reason about issues) →{" "}
                  <strong style={{ color: "#94a3b8" }}>Act</strong> (produce findings). Multiple agents run in
                  parallel, then an Orchestrator synthesizes all results into a comprehensive report.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
