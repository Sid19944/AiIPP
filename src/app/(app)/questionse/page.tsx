"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ── TYPES ────────────────────────────────────────────────────
type Question = {
  id: string;
  text: string;
  role: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  tags: string[];
  attempted: boolean;
  bestScore?: number;
};

// ── DATA ─────────────────────────────────────────────────────
const QUESTIONS: Question[] = [
  // FRONTEND
  { id: "f1", text: "Explain the difference between `useEffect` and `useLayoutEffect`. When would you use each?", role: "frontend", difficulty: "medium", topic: "React Hooks", tags: ["react", "hooks", "rendering"], attempted: true, bestScore: 82 },
  { id: "f2", text: "What is the virtual DOM and how does React use it to optimize rendering performance?", role: "frontend", difficulty: "easy", topic: "React Core", tags: ["react", "performance", "dom"], attempted: true, bestScore: 91 },
  { id: "f3", text: "Describe CSS specificity. How does it determine which styles get applied to an element?", role: "frontend", difficulty: "easy", topic: "CSS", tags: ["css", "specificity", "styling"], attempted: true, bestScore: 76 },
  { id: "f4", text: "What are React Server Components and how do they differ from Client Components?", role: "frontend", difficulty: "hard", topic: "Next.js", tags: ["react", "nextjs", "ssr"], attempted: false },
  { id: "f5", text: "How would you optimize the performance of a slow React application? Walk through your approach.", role: "frontend", difficulty: "medium", topic: "Performance", tags: ["react", "performance", "optimization"], attempted: true, bestScore: 88 },
  { id: "f6", text: "Explain code splitting and lazy loading. How do you implement them in a React app?", role: "frontend", difficulty: "medium", topic: "Performance", tags: ["react", "lazy", "bundling"], attempted: false },
  { id: "f7", text: "What is the difference between controlled and uncontrolled components in React?", role: "frontend", difficulty: "easy", topic: "React Core", tags: ["react", "forms", "state"], attempted: false },
  { id: "f8", text: "How does the browser render a webpage? Explain the critical rendering path.", role: "frontend", difficulty: "hard", topic: "Browser APIs", tags: ["browser", "performance", "rendering"], attempted: false },
  { id: "f9", text: "Explain CSS Grid vs Flexbox. When would you choose one over the other?", role: "frontend", difficulty: "easy", topic: "CSS", tags: ["css", "layout", "grid", "flexbox"], attempted: false },
  { id: "f10", text: "What are Web Workers and when would you use them in a frontend application?", role: "frontend", difficulty: "hard", topic: "Browser APIs", tags: ["javascript", "performance", "concurrency"], attempted: false },
  { id: "f11", text: "How would you implement infinite scroll in React without a library?", role: "frontend", difficulty: "medium", topic: "React Patterns", tags: ["react", "intersection-observer", "performance"], attempted: false },
  { id: "f12", text: "Explain the event loop in JavaScript. How does it handle async operations?", role: "frontend", difficulty: "medium", topic: "JavaScript", tags: ["javascript", "async", "event-loop"], attempted: false },

  // BACKEND
  { id: "b1", text: "Explain the difference between authentication and authorization. How would you implement both in Node.js?", role: "backend", difficulty: "medium", topic: "Security", tags: ["auth", "jwt", "security"], attempted: false },
  { id: "b2", text: "What is the N+1 query problem and how do you solve it in Mongoose or any ORM?", role: "backend", difficulty: "medium", topic: "Databases", tags: ["mongodb", "mongoose", "performance"], attempted: false },
  { id: "b3", text: "Describe RESTful API design principles. What makes an API truly RESTful?", role: "backend", difficulty: "easy", topic: "API Design", tags: ["rest", "api", "http"], attempted: false },
  { id: "b4", text: "How does Node.js handle asynchronous operations under the hood using the event loop?", role: "backend", difficulty: "hard", topic: "Node.js", tags: ["nodejs", "async", "event-loop"], attempted: false },
  { id: "b5", text: "What is database indexing? When should you use it and what are the trade-offs?", role: "backend", difficulty: "medium", topic: "Databases", tags: ["database", "indexing", "performance"], attempted: false },
  { id: "b6", text: "How would you design a rate limiting system for a high-traffic API?", role: "backend", difficulty: "hard", topic: "Architecture", tags: ["rate-limiting", "redis", "api"], attempted: false },
  { id: "b7", text: "Explain the difference between SQL and NoSQL databases. When would you choose each?", role: "backend", difficulty: "easy", topic: "Databases", tags: ["sql", "nosql", "mongodb", "postgresql"], attempted: false },
  { id: "b8", text: "How would you handle file uploads securely in a Node.js application?", role: "backend", difficulty: "medium", topic: "Node.js", tags: ["nodejs", "security", "storage"], attempted: false },

  // FULLSTACK
  { id: "fs1", text: "Explain SSR, SSG, ISR, and CSR in Next.js. When would you choose each approach?", role: "fullstack", difficulty: "hard", topic: "Next.js", tags: ["nextjs", "ssr", "ssg", "rendering"], attempted: false },
  { id: "fs2", text: "How would you design a real-time notification system that scales to millions of users?", role: "fullstack", difficulty: "hard", topic: "Architecture", tags: ["websockets", "scaling", "architecture"], attempted: false },
  { id: "fs3", text: "Walk me through the JWT authentication flow from login to accessing a protected endpoint.", role: "fullstack", difficulty: "medium", topic: "Auth", tags: ["jwt", "auth", "security"], attempted: false },
  { id: "fs4", text: "What are microservices? When would you choose them over a monolithic architecture?", role: "fullstack", difficulty: "hard", topic: "Architecture", tags: ["microservices", "architecture", "scaling"], attempted: false },
  { id: "fs5", text: "How do you handle state management in a large Next.js application?", role: "fullstack", difficulty: "medium", topic: "State Management", tags: ["nextjs", "state", "zustand", "redux"], attempted: false },

  // DSA
  { id: "d1", text: "Explain binary search. What are its prerequisites and time/space complexity?", role: "dsa", difficulty: "easy", topic: "Searching", tags: ["binary-search", "arrays", "complexity"], attempted: false },
  { id: "d2", text: "What is dynamic programming? Explain with the classic coin change problem.", role: "dsa", difficulty: "hard", topic: "Dynamic Programming", tags: ["dp", "memoization", "optimization"], attempted: false },
  { id: "d3", text: "How does a hash table work internally? What are collisions and how are they resolved?", role: "dsa", difficulty: "medium", topic: "Data Structures", tags: ["hash-table", "collision", "data-structures"], attempted: false },
  { id: "d4", text: "Explain BFS vs DFS graph traversal. When would you use each one?", role: "dsa", difficulty: "medium", topic: "Graphs", tags: ["bfs", "dfs", "graphs", "traversal"], attempted: false },
  { id: "d5", text: "What is the two-pointer technique? Give an example that reduces O(n²) to O(n).", role: "dsa", difficulty: "easy", topic: "Arrays", tags: ["two-pointer", "arrays", "optimization"], attempted: false },
  { id: "d6", text: "Explain merge sort. What is its time complexity and when would you prefer it over quicksort?", role: "dsa", difficulty: "medium", topic: "Sorting", tags: ["merge-sort", "sorting", "complexity"], attempted: false },

  // SYSTEM DESIGN
  { id: "s1", text: "How would you design a URL shortening service like bit.ly? Walk through your decisions.", role: "system", difficulty: "medium", topic: "System Design", tags: ["system-design", "databases", "caching"], attempted: false },
  { id: "s2", text: "Explain horizontal vs vertical scaling. When would you choose one over the other?", role: "system", difficulty: "easy", topic: "Scaling", tags: ["scaling", "architecture", "cloud"], attempted: false },
  { id: "s3", text: "What is the CAP theorem and what are its practical implications for database choice?", role: "system", difficulty: "hard", topic: "Distributed Systems", tags: ["cap-theorem", "distributed", "consistency"], attempted: false },
  { id: "s4", text: "Design a notification system for a social media platform with 50 million daily users.", role: "system", difficulty: "hard", topic: "System Design", tags: ["notifications", "queues", "scaling"], attempted: false },
  { id: "s5", text: "How would you implement a cache invalidation strategy? What are the trade-offs?", role: "system", difficulty: "medium", topic: "Caching", tags: ["caching", "redis", "invalidation"], attempted: false },
];

const ROLES = [
  { id: "all", label: "All Roles", emoji: "🌐", count: QUESTIONS.length },
  { id: "frontend", label: "Frontend", emoji: "⚛️", count: QUESTIONS.filter(q => q.role === "frontend").length },
  { id: "backend", label: "Backend", emoji: "⚙️", count: QUESTIONS.filter(q => q.role === "backend").length },
  { id: "fullstack", label: "Full Stack", emoji: "🌐", count: QUESTIONS.filter(q => q.role === "fullstack").length },
  { id: "dsa", label: "DSA", emoji: "🧮", count: QUESTIONS.filter(q => q.role === "dsa").length },
  { id: "system", label: "System Design", emoji: "🏗️", count: QUESTIONS.filter(q => q.role === "system").length },
];

const TOPICS = ["All Topics", "React Hooks", "React Core", "CSS", "Performance", "JavaScript", "Next.js", "Browser APIs", "Security", "Databases", "API Design", "Node.js", "Architecture", "Auth", "Searching", "Dynamic Programming", "Data Structures", "Graphs", "Arrays", "Sorting", "System Design", "Scaling", "Distributed Systems", "Caching", "State Management", "React Patterns"];

// ── HELPERS ──────────────────────────────────────────────────
const diffConfig = {
  easy:   { color: "#4ADE80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.2)",  label: "Easy" },
  medium: { color: "#FBBF24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.2)",  label: "Medium" },
  hard:   { color: "#F87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)", label: "Hard" },
};

const roleColors: Record<string, string> = {
  frontend: "#38BDF8", backend: "#34D399", fullstack: "#A78BFA",
  dsa: "#FB923C", system: "#F472B6",
};

const scoreColor = (s: number) => s >= 80 ? "#4ADE80" : s >= 60 ? "#FBBF24" : "#F87171";

// ── QUESTION CARD ─────────────────────────────────────────────
function QuestionCard({ q, index }: { q: Question; index: number }) {
  const [open, setOpen] = useState(false);
  const [practicing, setPracticing] = useState(false);
  const diff = diffConfig[q.difficulty];
  const roleColor = roleColors[q.role] || "#818CF8";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      style={{
        background: open ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${open ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`,
        borderRadius: 18, overflow: "hidden", transition: "all 0.25s",
      }}>

      {/* main row */}
      <div style={{ padding: "1rem 1.25rem", display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>

        {/* status dot */}
        <div style={{ marginTop: 4, flexShrink: 0 }}>
          {q.attempted ? (
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              background: `${scoreColor(q.bestScore || 0)}15`,
              border: `1.5px solid ${scoreColor(q.bestScore || 0)}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, color: scoreColor(q.bestScore || 0), fontWeight: 700,
            }}>{q.bestScore}</div>
          ) : (
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              border: "1.5px dashed rgba(255,255,255,0.15)",
            }} />
          )}
        </div>

        {/* content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.75)",
            margin: "0 0 0.625rem", fontFamily: "'Lora', serif",
          }}>{q.text}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {/* difficulty */}
            <span style={{
              fontSize: 11, padding: "2px 8px", borderRadius: 100, fontWeight: 600,
              background: diff.bg, border: `1px solid ${diff.border}`, color: diff.color,
            }}>{diff.label}</span>

            {/* topic */}
            <span style={{
              fontSize: 11, padding: "2px 8px", borderRadius: 100,
              background: `${roleColor}10`, border: `1px solid ${roleColor}20`, color: `${roleColor}`,
              opacity: 0.8,
            }}>{q.topic}</span>

            {/* tags */}
            {q.tags.slice(0, 2).map((tag) => (
              <span key={tag} style={{
                fontSize: 10, color: "rgba(255,255,255,0.2)",
                fontFamily: "'IBM Plex Mono', monospace",
              }}>#{tag}</span>
            ))}

            {q.attempted && q.bestScore !== undefined && (
              <span style={{ marginLeft: "auto", fontSize: 11, color: scoreColor(q.bestScore),
                              fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>
                Best: {q.bestScore}pts
              </span>
            )}
          </div>
        </div>

        {/* action buttons */}
        <div style={{ display: "flex", gap: 6, flexShrink: 0, alignItems: "center" }}>
          <button onClick={() => setOpen(!open)} style={{
            padding: "6px 12px", borderRadius: 10, fontSize: 12, cursor: "pointer",
            background: "transparent", border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.35)", transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}>
            {open ? "Hide" : "View"}
          </button>

          <Link href={`/interview/setup?role=${q.role}&topic=${q.topic}`} style={{
            padding: "6px 14px", borderRadius: 10, fontSize: 12, fontWeight: 500,
            background: "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.25))",
            border: "1px solid rgba(99,102,241,0.3)", color: "#818CF8",
            textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.4))"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.25))"; }}>
            Practice
          </Link>
        </div>
      </div>

      {/* expanded */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}>
            <div style={{
              margin: "0 1.25rem 1.25rem",
              padding: "1rem", borderRadius: 14,
              background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)",
            }}>
              <p style={{ fontSize: 11, color: "rgba(129,140,248,0.6)", textTransform: "uppercase",
                           letterSpacing: "0.1em", fontWeight: 700, margin: "0 0 8px",
                           display: "flex", alignItems: "center", gap: 5 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/>
                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
                </svg>
                What to cover in your answer
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                {getHints(q).map((hint, i) => (
                  <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
                    <span style={{ color: "#818CF8", fontWeight: 700, fontSize: 10, flexShrink: 0,
                                   fontFamily: "'IBM Plex Mono', monospace", marginTop: 2 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{hint}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "0.875rem", display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>All tags:</span>
                {q.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: 10, padding: "2px 7px", borderRadius: 100,
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.3)", fontFamily: "'IBM Plex Mono', monospace",
                  }}>#{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── ANSWER HINTS ──────────────────────────────────────────────
function getHints(q: Question): string[] {
  const hintMap: Record<string, string[]> = {
    f1: ["Sync vs async execution timing", "DOM measurement use cases", "SSR limitations", "Performance implications"],
    f2: ["JavaScript object representation", "Diffing algorithm", "Reconciliation process", "Batched updates benefit"],
    f3: ["Specificity weight system (0,1,0,0)", "Cascade order", "!important and when to avoid", "Inheritance vs specificity"],
    f4: ["Server-side vs client-side rendering", "No useState/useEffect on server", "Data fetching patterns", "Streaming and Suspense"],
    f5: ["Profile first with DevTools", "React.memo and useMemo", "Code splitting with lazy()", "Virtualization for lists"],
  };
  return hintMap[q.id] || [
    "Define the core concept clearly",
    "Provide a real-world use case",
    "Mention trade-offs or limitations",
    "Give a code example if relevant",
  ];
}

// ── MAIN ─────────────────────────────────────────────────────
export default function QuestionsPage() {
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedDiff, setSelectedDiff] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [search, setSearch] = useState("");
  const [showAttempted, setShowAttempted] = useState<"all" | "attempted" | "unattempted">("all");
  const [view, setView] = useState<"list" | "grid">("list");

  const filtered = useMemo(() => {
    return QUESTIONS.filter((q) => {
      if (selectedRole !== "all" && q.role !== selectedRole) return false;
      if (selectedDiff !== "all" && q.difficulty !== selectedDiff) return false;
      if (selectedTopic !== "All Topics" && q.topic !== selectedTopic) return false;
      if (showAttempted === "attempted" && !q.attempted) return false;
      if (showAttempted === "unattempted" && q.attempted) return false;
      if (search && !q.text.toLowerCase().includes(search.toLowerCase()) &&
          !q.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
      return true;
    });
  }, [selectedRole, selectedDiff, selectedTopic, search, showAttempted]);

  const attempted = QUESTIONS.filter(q => q.attempted).length;
  const avgScore = Math.round(
    QUESTIONS.filter(q => q.attempted && q.bestScore).reduce((a, q) => a + (q.bestScore || 0), 0) /
    (QUESTIONS.filter(q => q.attempted).length || 1)
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        input::placeholder { color: rgba(255,255,255,0.18); }
        input { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
      `}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh",
                    background: "#080B12", color: "#E8EAF0" }}>

        {/* bg */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none",
          backgroundImage: `
            radial-gradient(ellipse 50% 40% at 10% 10%, rgba(99,102,241,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 90% 90%, rgba(168,85,247,0.04) 0%, transparent 60%)`,
        }} />
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.012) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        {/* ── NAV ────────────────────────────────────────── */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(8,11,18,0.9)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "0.875rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Link href="/dashboard" style={{
              color: "rgba(255,255,255,0.28)", display: "flex", alignItems: "center", gap: 6,
              fontSize: 13, textDecoration: "none", transition: "color 0.2s",
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Dashboard
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{
                width: 26, height: 26, borderRadius: 8,
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>PrepAI</span>
            </div>
          </div>

          {/* progress pill */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 100, padding: "5px 14px",
          }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Progress</span>
            <div style={{ width: 80, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${(attempted / QUESTIONS.length) * 100}%`, height: "100%",
                             background: "linear-gradient(90deg, #6366F1, #4ADE80)", borderRadius: 2 }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)",
                            fontFamily: "'IBM Plex Mono', monospace" }}>
              {attempted}/{QUESTIONS.length}
            </span>
          </div>
        </nav>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem",
                      position: "relative", zIndex: 1 }}>

          {/* ── PAGE HEADER ──────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: "2rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: 100, padding: "4px 12px", fontSize: 11,
              color: "rgba(129,140,248,0.8)", fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem",
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              Question Bank
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h1 style={{
                  fontFamily: "'Lora', serif", fontSize: "clamp(26px, 3.5vw, 38px)",
                  fontWeight: 600, color: "rgba(255,255,255,0.88)", margin: "0 0 6px", lineHeight: 1.2,
                }}>
                  {QUESTIONS.length} interview questions,
                  <br/><em style={{ color: "#818CF8" }}>curated for you</em>
                </h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.28)", margin: 0 }}>
                  Browse, filter, and practice any question. Track your progress as you go.
                </p>
              </div>

              {/* stats */}
              <div style={{ display: "flex", gap: "1.25rem" }}>
                {[
                  { label: "Attempted", value: attempted, color: "#4ADE80" },
                  { label: "Avg Score", value: `${avgScore}`, color: "#FBBF24" },
                  { label: "Remaining", value: QUESTIONS.length - attempted, color: "#818CF8" },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color,
                                   fontFamily: "'Lora', serif", lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── ROLE TABS ────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ display: "flex", gap: 6, marginBottom: "1.25rem", flexWrap: "wrap" }}>
            {ROLES.map((role) => (
              <button key={role.id} onClick={() => setSelectedRole(role.id)} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 14px", borderRadius: 100, fontSize: 13, cursor: "pointer",
                transition: "all 0.2s", border: "none", fontFamily: "'DM Sans', sans-serif",
                background: selectedRole === role.id
                  ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
                color: selectedRole === role.id ? "#818CF8" : "rgba(255,255,255,0.35)",
                outline: selectedRole === role.id ? "1px solid rgba(99,102,241,0.35)" : "1px solid transparent",
              }}>
                <span style={{ fontSize: 14 }}>{role.emoji}</span>
                {role.label}
                <span style={{
                  fontSize: 10, fontFamily: "'IBM Plex Mono', monospace",
                  color: selectedRole === role.id ? "rgba(129,140,248,0.6)" : "rgba(255,255,255,0.18)",
                }}>{role.count}</span>
              </button>
            ))}
          </motion.div>

          {/* ── FILTERS ROW ──────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{ display: "flex", gap: 8, marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>

            {/* search */}
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                             color: "rgba(255,255,255,0.2)" }} width="14" height="14" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions or tags…"
                style={{
                  width: "100%", padding: "8px 12px 8px 34px", borderRadius: 12, fontSize: 13,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>

            {/* difficulty */}
            <select value={selectedDiff} onChange={(e) => setSelectedDiff(e.target.value)} style={{
              padding: "8px 12px", borderRadius: 12, fontSize: 13, cursor: "pointer",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", outline: "none",
            }}>
              <option value="all">All Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            {/* topic */}
            <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} style={{
              padding: "8px 12px", borderRadius: 12, fontSize: 13, cursor: "pointer",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", outline: "none",
            }}>
              {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            {/* attempted filter */}
            <div style={{ display: "flex", background: "rgba(255,255,255,0.04)",
                           border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 3 }}>
              {(["all", "attempted", "unattempted"] as const).map((opt) => (
                <button key={opt} onClick={() => setShowAttempted(opt)} style={{
                  padding: "5px 10px", borderRadius: 9, fontSize: 12, cursor: "pointer",
                  border: "none", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                  background: showAttempted === opt ? "rgba(99,102,241,0.2)" : "transparent",
                  color: showAttempted === opt ? "#818CF8" : "rgba(255,255,255,0.3)",
                  textTransform: "capitalize",
                }}>{opt}</button>
              ))}
            </div>

            {/* result count */}
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)",
                            fontFamily: "'IBM Plex Mono', monospace", marginLeft: "auto" }}>
              {filtered.length} questions
            </span>
          </motion.div>

          {/* ── QUICK START BANNER ───────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0.875rem 1.25rem", borderRadius: 16, marginBottom: "1.25rem",
              background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.08))",
              border: "1px solid rgba(99,102,241,0.18)", flexWrap: "wrap", gap: "0.75rem",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ADE80" }}
                   className="animate-pulse" />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                Ready for a full mock interview?
              </span>
            </div>
            <Link href="/interview/setup" style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "7px 16px", borderRadius: 10, textDecoration: "none",
              background: "rgba(99,102,241,0.25)", border: "1px solid rgba(99,102,241,0.3)",
              color: "#818CF8", fontSize: 13, fontWeight: 500, transition: "all 0.2s",
            }}>
              Start interview
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          </motion.div>

          {/* ── QUESTION LIST ─────────────────────────────── */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {filtered.map((q, i) => (
                  <QuestionCard key={q.id} q={q} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{
                  textAlign: "center", padding: "5rem 2rem",
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 20,
                }}>
                <div style={{ fontSize: 36, marginBottom: "0.75rem" }}>🔍</div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", margin: "0 0 6px",
                             fontFamily: "'Lora', serif" }}>No questions match your filters</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", margin: "0 0 1.25rem" }}>
                  Try adjusting the role, difficulty, or search term
                </p>
                <button onClick={() => {
                  setSelectedRole("all"); setSelectedDiff("all");
                  setSelectedTopic("All Topics"); setSearch(""); setShowAttempted("all");
                }} style={{
                  padding: "8px 18px", borderRadius: 10, fontSize: 13, cursor: "pointer",
                  background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)",
                  color: "#818CF8",
                }}>Clear all filters</button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── BOTTOM CTA ───────────────────────────────── */}
          {filtered.length > 0 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{
                marginTop: "2rem", padding: "1.75rem",
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 20, textAlign: "center",
              }}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 20, color: "rgba(255,255,255,0.7)",
                           margin: "0 0 6px" }}>
                Ready to test yourself?
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", margin: "0 0 1.25rem" }}>
                Start a full mock session and get AI feedback on every answer.
              </p>
              <Link href="/interview/setup" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "10px 24px", borderRadius: 12, textDecoration: "none",
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                color: "#fff", fontSize: 14, fontWeight: 600,
              }}>
                Start Mock Interview
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </Link>
            </motion.div>
          )}

        </div>

        <style>{`
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
          .animate-pulse { animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite; }
          select option { background: #0E1118; color: #E8EAF0; }
        `}</style>
      </div>
    </>
  );
}