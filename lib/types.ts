// ============================================================
// CodeGuard AI — Type Definitions
// ============================================================

export type Language =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "cpp"
  | "c"
  | "go"
  | "rust"
  | "php"
  | "ruby"
  | "swift"
  | "kotlin"
  | "csharp"
  | "html"
  | "css"
  | "sql"
  | "auto";

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type IssueCategory =
  | "bug"
  | "security"
  | "performance"
  | "code_quality"
  | "maintainability"
  | "best_practice"
  | "documentation"
  | "type_safety"
  | "memory_leak"
  | "dead_code";

export interface CodeIssue {
  id: string;
  line: number | null;
  endLine?: number | null;
  column?: number | null;
  severity: Severity;
  category: IssueCategory;
  title: string;
  description: string;
  suggestion: string;
  codeSnippet?: string;
  fixedSnippet?: string;
  ruleId?: string;
  documentation?: string;
}

export interface ComplexityMetrics {
  cyclomaticComplexity: number;
  linesOfCode: number;
  commentRatio: number;
  functionCount: number;
  averageFunctionLength: number;
  nestingDepth: number;
  duplicateCodeRatio: number;
}

export interface SecurityMetrics {
  hasHardcodedSecrets: boolean;
  hasInjectionRisk: boolean;
  hasInsecureDependencies: boolean;
  hasXSSVulnerability: boolean;
  hasInsecureDeserialization: boolean;
  hasMissingAuth: boolean;
  score: number; // 0-100
}

export interface QualityScore {
  overall: number;         // 0-100
  security: number;        // 0-100
  performance: number;     // 0-100
  maintainability: number; // 0-100
  reliability: number;     // 0-100
  codeStyle: number;       // 0-100
}

export interface AgentThought {
  step: number;
  agent: string;
  action: string;
  observation: string;
  timestamp: string;
}

export interface RefactoredCode {
  code: string;
  changesSummary: string[];
  linesChanged: number;
}

export interface ReviewResult {
  id: string;
  timestamp: string;
  language: Language;
  originalCode: string;
  issues: CodeIssue[];
  score: QualityScore;
  complexity: ComplexityMetrics;
  security: SecurityMetrics;
  summary: string;
  positives: string[];
  topPriorities: string[];
  agentThoughts: AgentThought[];
  refactoredCode?: RefactoredCode;
  reviewDuration: number; // ms
  totalIssues: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
}

export interface ReviewRequest {
  code: string;
  language: Language;
  context?: string;
  enableRefactor?: boolean;
  focusAreas?: IssueCategory[];
}

export interface ReviewHistoryEntry {
  id: string;
  timestamp: string;
  language: Language;
  score: number;
  criticalCount: number;
  snippet: string; // first 100 chars
}
