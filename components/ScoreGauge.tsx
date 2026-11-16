"use client";

interface ScoreGaugeProps {
  label: string;
  score: number;
  size?: "lg" | "sm";
}

function getScoreColor(score: number): string {
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#3b82f6";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

function getScoreGrade(score: number): string {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

export default function ScoreGauge({ label, score, size = "sm" }: ScoreGaugeProps) {
  const color = getScoreColor(score);
  const grade = getScoreGrade(score);
  const isLarge = size === "lg";

  // SVG circle gauge
  const radius = isLarge ? 44 : 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const svgSize = isLarge ? 110 : 72;
  const strokeWidth = isLarge ? 8 : 5;
  const center = svgSize / 2;

  return (
    <div
      className={`flex flex-col items-center justify-center p-3 rounded-xl ${isLarge ? "col-span-1" : ""}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid var(--card-border)",
      }}
    >
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Score arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease-out", filter: `drop-shadow(0 0 6px ${color}60)` }}
          />
        </svg>
        {/* Center text */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ top: 0 }}
        >
          <span
            className={`font-bold ${isLarge ? "text-2xl" : "text-base"}`}
            style={{ color }}
          >
            {score}
          </span>
          {isLarge && (
            <span className="text-xs font-semibold mt-0.5" style={{ color: `${color}bb` }}>
              {grade}
            </span>
          )}
        </div>
      </div>
      <span
        className={`mt-1 font-medium text-center ${isLarge ? "text-sm" : "text-xs"}`}
        style={{ color: "#94a3b8" }}
      >
        {label}
      </span>
    </div>
  );
}
