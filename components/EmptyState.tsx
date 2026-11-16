"use client";

interface EmptyStateProps {
  onLoadSample: (key: string) => void;
}

export default function EmptyState({ onLoadSample }: EmptyStateProps) {
  return (
    <div
      className="h-full flex flex-col items-center justify-center p-6 sm:p-10 rounded-xl border text-center"
      style={{
        background: "#0a0f1d",
        borderColor: "#1e293b",
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 bg-slate-800/80 border border-slate-700/80 shadow-sm"
      >
        🔍
      </div>

      <h3 className="font-extrabold text-base text-slate-100 mb-1.5">
        AI Code Inspector Ready
      </h3>

      <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6">
        Paste your code on the left and click <strong className="text-slate-300">Review Code</strong>, or test with one of these instant demo scenarios:
      </p>

      {/* 3 Interactive Cards to load samples */}
      <div className="w-full max-w-md space-y-2.5">
        <button
          onClick={() => onLoadSample("python_bugs")}
          className="w-full text-left p-3.5 rounded-xl border bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer group flex items-start gap-3"
        >
          <span className="text-xl mt-0.5">🐍</span>
          <div>
            <div className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
              Python: Command Injection & Memory Leak
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Tests subprocess execution, hardcoded keys, and unclosed connections.
            </div>
          </div>
        </button>

        <button
          onClick={() => onLoadSample("js_vulnerable")}
          className="w-full text-left p-3.5 rounded-xl border bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer group flex items-start gap-3"
        >
          <span className="text-xl mt-0.5">🟨</span>
          <div>
            <div className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
              JavaScript: SQL Injection & XSS
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Tests unescaped SQL queries and raw HTML reflection.
            </div>
          </div>
        </button>

        <button
          onClick={() => onLoadSample("ts_quality")}
          className="w-full text-left p-3.5 rounded-xl border bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer group flex items-start gap-3"
        >
          <span className="text-xl mt-0.5">🔷</span>
          <div>
            <div className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
              TypeScript: Algorithmic Bottleneck (O(n²))
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Tests quadratic loops, type safety abuse, and unhandled promises.
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
