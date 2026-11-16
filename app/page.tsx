"use client";

import { useState, useCallback } from "react";
import { ReviewResult, Language } from "@/lib/types";
import { SAMPLE_CODES } from "@/lib/samples";
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import ReviewDashboard from "@/components/ReviewDashboard";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<Language>("auto");
  const [reviewResult, setReviewResult] = useState<ReviewResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setReviewResult(null);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, enableRefactor: true }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Review failed");
      }

      setReviewResult(data as ReviewResult);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to analyze code";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [code, language, isLoading]);

  const handleLoadSample = (key: string) => {
    const sample = SAMPLE_CODES[key];
    if (sample) {
      setCode(sample.code);
      setLanguage(sample.language as Language);
      setReviewResult(null);
      setError(null);
    }
  };

  const handleClear = () => {
    setCode("");
    setReviewResult(null);
    setError(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "#060a12",
        color: "#f8fafc",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Sleek Fixed Navbar (Height: 50px) */}
      <Header
        onLoadSample={handleLoadSample}
        onClear={handleClear}
        hasCode={Boolean(code.trim())}
      />

      {/* Main Split-Screen Workbench (Locks to remaining 100% viewport, zero outer scroll) */}
      <main
        style={{
          flex: 1,
          overflow: "hidden",
          padding: "12px",
          display: "flex",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            overflow: "hidden",
          }}
        >
          {/* Left Pane: Code Input (50%) */}
          <div style={{ height: "100%", minHeight: 0, overflow: "hidden" }}>
            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
              onLanguageChange={setLanguage}
              onSubmit={handleReview}
              isLoading={isLoading}
            />
          </div>

          {/* Right Pane: Review & Fix Inspector (50%) */}
          <div
            style={{
              height: "100%",
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {error && (
              <div
                style={{
                  marginBottom: "8px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  background: "rgba(239, 68, 68, 0.1)",
                  fontSize: "12px",
                  color: "#fca5a5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>⚠️ {error}</span>
                <button
                  onClick={() => setError(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#f87171",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  ✕
                </button>
              </div>
            )}

            <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
              {isLoading ? (
                <LoadingState />
              ) : reviewResult ? (
                <ReviewDashboard result={reviewResult} />
              ) : (
                <EmptyState onLoadSample={handleLoadSample} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
