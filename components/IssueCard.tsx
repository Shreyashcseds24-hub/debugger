"use client";

import { useState } from "react";
import { CodeIssue } from "@/lib/types";
import { CATEGORY_ICONS, SEVERITY_COLORS } from "@/lib/samples";

interface IssueCardProps {
  issue: CodeIssue;
  index: number;
}

export default function IssueCard({ issue, index }: IssueCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const severityClass = SEVERITY_COLORS[issue.severity] || "badge-info";
  const categoryIcon = CATEGORY_ICONS[issue.category] || "📌";

  const copyFix = () => {
    if (issue.fixedSnippet) {
      navigator.clipboard.writeText(issue.fixedSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden transition-all animate-fade-in-up border"
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        borderColor: "var(--card-border)",
        animationDelay: `${index * 40}ms`,
        animationFillMode: "both",
      }}
    >
      {/* Clickable Card Header - LARGE & CLEAR */}
      <button
        className="w-full text-left px-5 py-4 flex items-start gap-4 cursor-pointer hover:bg-white/[0.03] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-xl flex-shrink-0 mt-0.5">{categoryIcon}</span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
            <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold uppercase tracking-wide ${severityClass}`}>
              {issue.severity}
            </span>
            {issue.line && (
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                Line {issue.line}
                {issue.endLine && issue.endLine !== issue.line ? `–${issue.endLine}` : ""}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-800/80 text-slate-400">
              {issue.category?.replace("_", " ")}
            </span>
          </div>

          <div className="font-bold text-sm sm:text-base text-slate-100">
            {issue.title}
          </div>

          {!expanded && (
            <div className="text-xs text-slate-400 mt-1 truncate">
              {issue.description}
            </div>
          )}
        </div>

        <span
          className="text-sm font-bold text-slate-400 flex-shrink-0 mt-1 transition-transform p-1 rounded-md bg-white/5"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div
          className="px-5 pb-5 space-y-4 border-t pt-4"
          style={{ borderColor: "var(--card-border)" }}
        >
          {/* Detailed explanation */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Issue Explanation:
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{issue.description}</p>
          </div>

          {/* Problematic code snippet */}
          {issue.codeSnippet && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-1.5 flex items-center gap-1.5">
                <span>❌</span>
                <span>Flagged Code Line:</span>
              </div>
              <pre
                className="p-3.5 rounded-xl overflow-x-auto text-xs font-mono border"
                style={{
                  background: "rgba(239, 68, 68, 0.08)",
                  borderColor: "rgba(239, 68, 68, 0.25)",
                  color: "#fca5a5",
                }}
              >
                {issue.codeSnippet}
              </pre>
            </div>
          )}

          {/* Suggested Fix */}
          {issue.fixedSnippet && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span>✅</span>
                  <span>Recommended Fix:</span>
                </div>
                <button
                  onClick={copyFix}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer"
                  style={{
                    background: copied ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.08)",
                    color: copied ? "#34d399" : "#e2e8f0",
                    borderColor: copied ? "rgba(16, 185, 129, 0.4)" : "#475569",
                  }}
                >
                  {copied ? "✓ Copied!" : "📋 Copy Fix"}
                </button>
              </div>
              <pre
                className="p-3.5 rounded-xl overflow-x-auto text-xs font-mono border"
                style={{
                  background: "rgba(16, 185, 129, 0.08)",
                  borderColor: "rgba(16, 185, 129, 0.25)",
                  color: "#86efac",
                }}
              >
                {issue.fixedSnippet}
              </pre>
            </div>
          )}

          {/* Actionable tip */}
          {issue.suggestion && (
            <div
              className="p-3.5 rounded-xl border flex items-start gap-2.5"
              style={{
                background: "rgba(59, 130, 246, 0.08)",
                borderColor: "rgba(59, 130, 246, 0.2)",
              }}
            >
              <span className="text-base flex-shrink-0 mt-0.5">💡</span>
              <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
                {issue.suggestion}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
