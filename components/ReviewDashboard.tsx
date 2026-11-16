"use client";

import { useState } from "react";
import { ReviewResult } from "@/lib/types";
import IssueCard from "./IssueCard";
import RefactoredCodeView from "./RefactoredCodeView";
import AgentThoughtsPanel from "./AgentThoughtsPanel";

interface ReviewDashboardProps {
  result: ReviewResult;
}

type Tab = "issues" | "refactored" | "trace";

export default function ReviewDashboard({ result }: ReviewDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("issues");
  const [issueFilter, setIssueFilter] = useState<string>("all");
  const [copiedReport, setCopiedReport] = useState(false);

  const filteredIssues =
    issueFilter === "all"
      ? result.issues
      : result.issues.filter((i) =>
          issueFilter === "critical"
            ? i.severity === "critical"
            : issueFilter === "security"
            ? i.category === "security"
            : issueFilter === "bug"
            ? i.category === "bug"
            : i.severity === issueFilter
        );

  const copyReport = () => {
    const report = `
CodeGuard AI — Code Review Report
==================================
Overall Score: ${result.score.overall}/100
Issues: ${result.totalIssues} (${result.criticalCount} Critical, ${result.highCount} High)
Language: ${result.language}

EXECUTIVE SUMMARY
-----------------
${result.summary}

TOP PRIORITIES
--------------
${result.topPriorities.map((p, i) => `${i + 1}. ${p}`).join("\n")}

FINDINGS
--------
${result.issues
  .map(
    (i) =>
      `[${i.severity?.toUpperCase()}] Line ${i.line ?? "N/A"}: ${i.title}\n  ${i.description}\n  Suggested Fix: ${i.suggestion}`
  )
  .join("\n\n")}
`;
    navigator.clipboard.writeText(report);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const scoreColor =
    result.score.overall >= 80
      ? "#10b981"
      : result.score.overall >= 60
      ? "#3b82f6"
      : result.score.overall >= 40
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div
      className="h-full flex flex-col rounded-xl overflow-hidden border shadow-sm"
      style={{
        background: "#0a0f1d",
        borderColor: "#1e293b",
      }}
    >
      {/* Top Health Header */}
      <div
        className="h-14 px-4 sm:px-5 border-b flex items-center justify-between bg-slate-900/90 flex-shrink-0"
        style={{ borderColor: "#1e293b" }}
      >
        <div className="flex items-center gap-3">
          {/* Health Score Pill */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-sm flex-shrink-0"
            style={{ background: scoreColor }}
          >
            {result.score.overall}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white">Review Summary</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {result.language}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Found {result.totalIssues} issue{result.totalIssues === 1 ? "" : "s"} ({result.criticalCount} critical, {result.highCount} high)
            </p>
          </div>
        </div>

        {/* Copy Report */}
        <button
          onClick={copyReport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
        >
          <span>{copiedReport ? "✓ Copied" : "📋 Copy Report"}</span>
        </button>
      </div>

      {/* Tabs Row */}
      <div
        className="h-10 px-4 border-b flex items-center gap-2 bg-slate-900/50 flex-shrink-0"
        style={{ borderColor: "#1e293b" }}
      >
        <button
          onClick={() => setActiveTab("issues")}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "issues"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <span>⚠️ Issues</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30">
            {result.totalIssues}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("refactored")}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "refactored"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <span>🔄 Fixed Code</span>
        </button>

        <button
          onClick={() => setActiveTab("trace")}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "trace"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <span>🧠 Agent Trace</span>
        </button>
      </div>

      {/* Tab Panels with Internal Scroll (Page never scrolls) */}
      <div className="flex-1 overflow-y-auto">
        {/* TAB 1: ISSUES LIST */}
        {activeTab === "issues" && (
          <div className="p-4 space-y-3">
            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 pb-1">
              {[
                { key: "all", label: "All", count: result.totalIssues },
                { key: "critical", label: "Critical", count: result.criticalCount },
                { key: "security", label: "Security", count: result.issues.filter((i) => i.category === "security").length },
                { key: "bug", label: "Bugs", count: result.issues.filter((i) => i.category === "bug").length },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setIssueFilter(f.key)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    issueFilter === f.key
                      ? "bg-slate-700 text-white font-bold border border-slate-600"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>

            {filteredIssues.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-400">
                No issues found matching this filter.
              </div>
            ) : (
              filteredIssues.map((issue, idx) => (
                <IssueCard key={issue.id || idx} issue={issue} index={idx} />
              ))
            )}
          </div>
        )}

        {/* TAB 2: REFACTORED CODE */}
        {activeTab === "refactored" && (
          <div className="h-full">
            {result.refactoredCode ? (
              <RefactoredCodeView
                original={result.originalCode}
                refactored={result.refactoredCode}
              />
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                Refactored code not available.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: AGENT REASONING TRACE */}
        {activeTab === "trace" && (
          <div className="p-4">
            <AgentThoughtsPanel thoughts={result.agentThoughts} />
          </div>
        )}
      </div>
    </div>
  );
}
