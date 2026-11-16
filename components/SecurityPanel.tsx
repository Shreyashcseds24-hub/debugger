"use client";

import { SecurityMetrics, CodeIssue } from "@/lib/types";

interface SecurityPanelProps {
  security: SecurityMetrics;
  issues: CodeIssue[];
}

const SECURITY_CHECKS = [
  { key: "hasHardcodedSecrets", label: "Hardcoded Secrets/API Keys", icon: "🔑", severity: "critical" },
  { key: "hasInjectionRisk", label: "Injection Vulnerabilities (SQL/CMD)", icon: "💉", severity: "critical" },
  { key: "hasXSSVulnerability", label: "Cross-Site Scripting (XSS)", icon: "🕷️", severity: "high" },
  { key: "hasInsecureDeserialization", label: "Insecure Deserialization", icon: "📦", severity: "high" },
  { key: "hasInsecureDependencies", label: "Insecure Dependencies", icon: "📚", severity: "medium" },
  { key: "hasMissingAuth", label: "Missing Authentication", icon: "🚪", severity: "high" },
] as const;

function getScoreColor(score: number) {
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
}

function getScoreLabel(score: number) {
  if (score >= 80) return "SECURE";
  if (score >= 60) return "MODERATE";
  return "VULNERABLE";
}

export default function SecurityPanel({ security, issues }: SecurityPanelProps) {
  const color = getScoreColor(security.score);
  const label = getScoreLabel(security.score);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (security.score / 100) * circumference;

  const vulnerableCount = SECURITY_CHECKS.filter(
    (c) => security[c.key as keyof SecurityMetrics] === true
  ).length;

  return (
    <div className="p-5 space-y-5">
      {/* Score + OWASP Badge */}
      <div className="flex items-center gap-6">
        {/* Circular score */}
        <div className="relative flex-shrink-0" style={{ width: 130, height: 130 }}>
          <svg width="130" height="130" viewBox="0 0 130 130" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="65" cy="65" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
            <circle
              cx="65" cy="65" r={radius}
              fill="none" stroke={color}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold" style={{ color }}>{security.score}</span>
            <span className="text-xs font-semibold mt-0.5" style={{ color: `${color}bb` }}>{label}</span>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h3 className="text-lg font-bold mb-1" style={{ color: "#e2e8f0" }}>Security Score</h3>
          <p className="text-sm mb-3" style={{ color: "#94a3b8" }}>
            Based on OWASP Top 10 vulnerability assessment
          </p>
          <div className="flex gap-3">
            <div
              className="px-3 py-2 rounded-xl text-center"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              <div className="text-xl font-bold text-red-400">{vulnerableCount}</div>
              <div className="text-xs text-red-300">Vulnerabilities</div>
            </div>
            <div
              className="px-3 py-2 rounded-xl text-center"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <div className="text-xl font-bold text-green-400">{SECURITY_CHECKS.length - vulnerableCount}</div>
              <div className="text-xs text-green-300">Passed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Checks */}
      <div>
        <h4 className="text-xs font-semibold mb-3" style={{ color: "#64748b" }}>OWASP VULNERABILITY SCAN</h4>
        <div className="space-y-2">
          {SECURITY_CHECKS.map((check) => {
            const isVulnerable = security[check.key as keyof SecurityMetrics] === true;
            return (
              <div
                key={check.key}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{
                  background: isVulnerable
                    ? "rgba(239,68,68,0.06)"
                    : "rgba(16,185,129,0.04)",
                  border: `1px solid ${isVulnerable ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.1)"}`,
                }}
              >
                <span className="text-lg">{check.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{ color: "#e2e8f0" }}>
                    {check.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>
                    Severity: <span style={{
                      color: check.severity === "critical" ? "#ef4444" :
                             check.severity === "high" ? "#f59e0b" : "#3b82f6"
                    }}>{check.severity.toUpperCase()}</span>
                  </div>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: isVulnerable ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.15)",
                    color: isVulnerable ? "#f87171" : "#34d399",
                  }}
                >
                  {isVulnerable ? "⚠️ FOUND" : "✓ PASS"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Issues */}
      {issues.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold mb-3" style={{ color: "#64748b" }}>
            SECURITY ISSUES DETAIL ({issues.length})
          </h4>
          <div className="space-y-2">
            {issues.map((issue, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl"
                style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-semibold"
                    style={{
                      background: "rgba(239,68,68,0.2)",
                      color: "#f87171",
                    }}
                  >
                    {issue.severity?.toUpperCase()}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#fca5a5" }}>{issue.title}</span>
                </div>
                <p className="text-xs" style={{ color: "#94a3b8" }}>{issue.description}</p>
                {issue.suggestion && (
                  <div className="mt-2 p-2 rounded-lg" style={{ background: "rgba(59,130,246,0.08)" }}>
                    <p className="text-xs" style={{ color: "#93c5fd" }}>💡 {issue.suggestion}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
