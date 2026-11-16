"use client";

interface HeaderProps {
  onLoadSample: (key: string) => void;
  onClear: () => void;
  hasCode: boolean;
}

export default function Header({ onLoadSample, onClear, hasCode }: HeaderProps) {
  return (
    <header
      style={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        background: "#0c1424",
        borderBottom: "1px solid #1e293b",
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            background: "linear-gradient(135deg, #2563eb, #6366f1)",
            color: "#ffffff",
          }}
        >
          🛡️
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontWeight: 800, fontSize: "15px", color: "#f8fafc", letterSpacing: "-0.02em" }}>
            CodeGuard
          </span>
          <span
            style={{
              padding: "2px 7px",
              borderRadius: "999px",
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              background: "rgba(59, 130, 246, 0.15)",
              color: "#60a5fa",
              border: "1px solid rgba(59, 130, 246, 0.3)",
            }}
          >
            Multi-Agent AI
          </span>
        </div>
      </div>

      {/* Center 1-click Quick Demos */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>
          Demos:
        </span>
        <button
          onClick={() => onLoadSample("python_bugs")}
          style={{
            padding: "5px 12px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 600,
            background: "#1e293b",
            color: "#e2e8f0",
            border: "1px solid #334155",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>🐍</span>
          <span>Python (Bugs & Injection)</span>
        </button>
        <button
          onClick={() => onLoadSample("js_vulnerable")}
          style={{
            padding: "5px 12px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 600,
            background: "#1e293b",
            color: "#e2e8f0",
            border: "1px solid #334155",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>🟨</span>
          <span>JavaScript (SQL & XSS)</span>
        </button>
        <button
          onClick={() => onLoadSample("ts_quality")}
          style={{
            padding: "5px 12px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 600,
            background: "#1e293b",
            color: "#e2e8f0",
            border: "1px solid #334155",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>🔷</span>
          <span>TypeScript (O(n²) Quality)</span>
        </button>
      </div>

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {hasCode && (
          <button
            onClick={onClear}
            style={{
              fontSize: "11px",
              color: "#94a3b8",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px 8px",
            }}
          >
            Clear Code
          </button>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "11px",
            fontWeight: 600,
            color: "#34d399",
            background: "rgba(16, 185, 129, 0.1)",
            padding: "4px 10px",
            borderRadius: "999px",
            border: "1px solid rgba(16, 185, 129, 0.25)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#34d399",
              display: "inline-block",
            }}
          />
          <span>Gemini 3.8 Ready</span>
        </div>
      </div>
    </header>
  );
}
