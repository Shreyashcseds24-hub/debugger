"use client";

import { useRef, useEffect } from "react";
import { Language } from "@/lib/types";

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "auto", label: "Auto Detect" },
  { value: "python", label: "Python 3" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "sql", label: "SQL" },
  { value: "php", label: "PHP" },
];

export default function CodeEditor({
  code,
  onChange,
  language,
  onLanguageChange,
  onSubmit,
  isLoading,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  // Synchronize gutter scrolling with textarea scrolling
  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = textareaRef.current!.selectionStart;
      const end = textareaRef.current!.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      onChange(newCode);
      setTimeout(() => {
        textareaRef.current!.selectionStart = textareaRef.current!.selectionEnd = start + 2;
      }, 0);
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      onSubmit();
    }
  };

  const lineCount = code ? code.split("\n").length : 1;
  const isCodeEmpty = !code.trim();

  // Keep gutter in sync if code changes
  useEffect(() => {
    handleScroll();
  }, [code]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #1e293b",
        background: "#0a0f1d",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      {/* Top File Tab Header */}
      <div
        style={{
          height: "44px",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0c1424",
          borderBottom: "1px solid #1e293b",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "14px" }}>📄</span>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: "#e2e8f0" }}>
            source_code
          </span>
          <span style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace" }}>
            ({lineCount} lines)
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#94a3b8" }}>
            Language:
          </span>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              background: "#1e293b",
              border: "1px solid #334155",
              color: "#f1f5f9",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value} style={{ background: "#0f172a" }}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Editor Body with Synchronized Scrolling */}
      <div
        style={{
          position: "relative",
          flex: 1,
          overflow: "hidden",
          display: "flex",
        }}
      >
        {/* Line numbers gutter — synchronizes scrollTop on scroll */}
        <div
          ref={gutterRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            paddingRight: "12px",
            paddingTop: "14px",
            paddingBottom: "14px",
            userSelect: "none",
            overflowY: "hidden",
            overflowX: "hidden",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0, 0, 0, 0.3)",
            color: "#475569",
            fontSize: "13px",
            lineHeight: "22px",
            fontFamily: "JetBrains Mono, Consolas, monospace",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          {Array.from({ length: Math.max(lineCount, 50) }, (_, i) => (
            <div
              key={i + 1}
              style={{
                height: "22px",
                lineHeight: "22px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea with onScroll synchronizing the gutter */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          placeholder="// Paste or write source code here...&#10;// Or click one of the quick demo buttons at the top!&#10;// Shortcut: Press Ctrl + Enter to review"
          spellCheck={false}
          style={{
            width: "100%",
            height: "100%",
            resize: "none",
            outline: "none",
            border: "none",
            background: "transparent",
            color: "#f8fafc",
            paddingTop: "14px",
            paddingBottom: "14px",
            paddingLeft: "60px",
            paddingRight: "16px",
            lineHeight: "22px",
            fontSize: "13px",
            fontFamily: "JetBrains Mono, Consolas, monospace",
            overflowY: "auto",
            overflowX: "auto",
            whiteSpace: "pre",
          }}
        />
      </div>

      {/* Footer with Big, Clean Analyze Button */}
      <div
        style={{
          height: "52px",
          padding: "0 16px",
          borderTop: "1px solid #1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0c1424",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace" }}>
          Shortcut: <kbd style={{ padding: "2px 6px", borderRadius: "4px", background: "#1e293b", color: "#cbd5e1" }}>Ctrl</kbd> + <kbd style={{ padding: "2px 6px", borderRadius: "4px", background: "#1e293b", color: "#cbd5e1" }}>Enter</kbd>
        </span>

        <button
          onClick={onSubmit}
          disabled={isCodeEmpty || isLoading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "bold",
            cursor: isCodeEmpty || isLoading ? "not-allowed" : "pointer",
            border: "none",
            background: isCodeEmpty
              ? "#1e293b"
              : isLoading
              ? "#1d4ed8"
              : "linear-gradient(135deg, #2563eb, #3b82f6)",
            color: isCodeEmpty ? "#64748b" : "#ffffff",
            boxShadow: isCodeEmpty ? "none" : "0 2px 10px rgba(37, 99, 235, 0.4)",
            transition: "all 0.15s ease",
          }}
        >
          {isLoading ? (
            <span>Analyzing...</span>
          ) : (
            <>
              <span>🔍</span>
              <span>Review Code</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
