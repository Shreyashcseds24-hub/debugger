"use client";

import { useState, useEffect } from "react";

const AGENTS = [
  {
    id: 1,
    name: "Bug-Finder Agent",
    icon: "🐛",
    color: "#f87171",
    task: "Scanning runtime exceptions, null checks & boundary errors...",
    done: "Identified logic gaps and error conditions",
  },
  {
    id: 2,
    name: "Security Auditor Agent",
    icon: "🔒",
    color: "#fbbf24",
    task: "Auditing OWASP Top 10, SQL/Command injection & hardcoded secrets...",
    done: "Vulnerability analysis and exploit checks completed",
  },
  {
    id: 3,
    name: "Performance Analyst",
    icon: "⚡",
    color: "#60a5fa",
    task: "Profiling algorithmic complexity, nested loops & memory leaks...",
    done: "Calculated complexity metrics and resource boundaries",
  },
  {
    id: 4,
    name: "Code Quality Inspector",
    icon: "✨",
    color: "#c084fc",
    task: "Evaluating naming hygiene, SOLID conventions & DRY principles...",
    done: "Maintainability and clean code scoring established",
  },
  {
    id: 5,
    name: "Refactoring Agent",
    icon: "🔄",
    color: "#34d399",
    task: "Synthesizing production-grade code rewrite with all fixes applied...",
    done: "Generated full refactored code patch",
  },
  {
    id: 6,
    name: "Orchestrator Agent",
    icon: "🎯",
    color: "#38bdf8",
    task: "Consolidating squad reports and computing final health grade...",
    done: "Review ready to inspect",
  },
];

export default function LoadingState() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < 5 ? prev + 1 : prev));
    }, 850);
    return () => clearInterval(timer);
  }, []);

  const progressPercent = Math.min(100, Math.round(((activeStep + 1) / AGENTS.length) * 100));

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #1e293b",
        background: "#0a0f1d",
        padding: "16px",
      }}
    >
      {/* Top Banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
          paddingBottom: "12px",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#3b82f6",
              boxShadow: "0 0 10px #3b82f6",
              animation: "pulse 1.5s infinite",
            }}
          />
          <div>
            <div style={{ fontSize: "13px", fontWeight: "bold", color: "#f8fafc" }}>
              Multi-Agent Squad Collaborating
            </div>
            <div style={{ fontSize: "11px", color: "#94a3b8" }}>
              Agent {activeStep + 1} of 6 actively processing code
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: "11px",
            fontWeight: "bold",
            color: "#60a5fa",
            background: "rgba(59, 130, 246, 0.15)",
            padding: "3px 10px",
            borderRadius: "999px",
            border: "1px solid rgba(59, 130, 246, 0.3)",
          }}
        >
          {progressPercent}% Complete
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "4px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "999px",
          overflow: "hidden",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981)",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* 6 Agent Cards List */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          overflowY: "auto",
        }}
      >
        {AGENTS.map((agent, index) => {
          const isDone = index < activeStep;
          const isCurrent = index === activeStep;
          const isWaiting = index > activeStep;

          return (
            <div
              key={agent.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 14px",
                borderRadius: "10px",
                border: isCurrent
                  ? "1px solid rgba(59, 130, 246, 0.5)"
                  : isDone
                  ? "1px solid rgba(16, 185, 129, 0.25)"
                  : "1px solid rgba(255,255,255,0.04)",
                background: isCurrent
                  ? "rgba(59, 130, 246, 0.08)"
                  : isDone
                  ? "rgba(16, 185, 129, 0.04)"
                  : "rgba(255,255,255,0.01)",
                transition: "all 0.3s ease",
              }}
            >
              {/* Agent Icon Badge */}
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "15px",
                  background: isDone
                    ? "rgba(16, 185, 129, 0.15)"
                    : isCurrent
                    ? "rgba(59, 130, 246, 0.2)"
                    : "rgba(255,255,255,0.03)",
                  border: isDone
                    ? "1px solid rgba(16, 185, 129, 0.4)"
                    : isCurrent
                    ? "1px solid rgba(59, 130, 246, 0.4)"
                    : "1px solid transparent",
                  flexShrink: 0,
                }}
              >
                {agent.icon}
              </div>

              {/* Agent Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: isDone ? "#34d399" : isCurrent ? "#f8fafc" : "#64748b",
                    }}
                  >
                    {agent.name}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: isCurrent ? "#93c5fd" : isDone ? "#94a3b8" : "#475569",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginTop: "2px",
                  }}
                >
                  {isDone ? agent.done : isCurrent ? agent.task : "Queued in pipeline..."}
                </div>
              </div>

              {/* Status Indicator */}
              <div style={{ flexShrink: 0 }}>
                {isDone ? (
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      color: "#34d399",
                      background: "rgba(16, 185, 129, 0.15)",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                    }}
                  >
                    ✓ Done
                  </span>
                ) : isCurrent ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#3b82f6",
                        display: "inline-block",
                        animation: "pulse 1s infinite",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: "#60a5fa",
                        background: "rgba(59, 130, 246, 0.15)",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        border: "1px solid rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      Working...
                    </span>
                  </div>
                ) : (
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#475569",
                      padding: "3px 8px",
                    }}
                  >
                    Waiting
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
