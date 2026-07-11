"use client";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

// ── TYPES ─────────────────────────────────────────────────────
type Difficulty = "easy" | "medium" | "hard";
type Question = {
  id: string;
  text: string;
  role: string;
  difficulty: Difficulty;
  topic: string;
  tags: string[];
  attempted: boolean;
  bestScore?: number;
  hints: string[];
};

// ── DATA ──────────────────────────────────────────────────────
const ALL_QUESTIONS: Question[] = [
  { id:"f1", text:"Explain the difference between useEffect and useLayoutEffect. When would you choose one over the other?", role:"frontend", difficulty:"medium", topic:"React Hooks", tags:["react","hooks","rendering"], attempted:true, bestScore:82, hints:["Sync vs async after paint","DOM measurement use case","SSR limitation","Performance implications"] },
  { id:"f2", text:"What is the virtual DOM and how does React use it to optimize rendering performance?", role:"frontend", difficulty:"easy", topic:"React Core", tags:["react","dom","performance"], attempted:true, bestScore:91, hints:["JS representation of real DOM","Diffing algorithm","Reconciliation process","Batched updates"] },
  { id:"f3", text:"Describe CSS specificity. How does it determine which styles are applied to an element?", role:"frontend", difficulty:"easy", topic:"CSS", tags:["css","specificity","cascade"], attempted:true, bestScore:76, hints:["Inline > ID > class > element","Four-number score (0,1,0,0)","!important and why to avoid","Inheritance vs specificity"] },
  { id:"f4", text:"What are React Server Components and how do they differ from Client Components in Next.js?", role:"frontend", difficulty:"hard", topic:"Next.js", tags:["react","nextjs","ssr","rsc"], attempted:false, hints:["No useState/useEffect on server","Data fetching at component level","Streaming and Suspense","Bundle size reduction"] },
  { id:"f5", text:"How would you approach optimizing a slow React application? Walk through your process.", role:"frontend", difficulty:"medium", topic:"Performance", tags:["react","performance","profiling"], attempted:true, bestScore:88, hints:["Profile first with DevTools","React.memo and useMemo","Code splitting with lazy()","Virtualization for long lists"] },
  { id:"f6", text:"Explain code splitting and lazy loading. How do you implement them in a React app?", role:"frontend", difficulty:"medium", topic:"Performance", tags:["react","lazy","bundling","webpack"], attempted:false, hints:["React.lazy() and Suspense","Dynamic import()","Route-based splitting","Component-level splitting"] },
  { id:"f7", text:"What is the difference between controlled and uncontrolled components in React?", role:"frontend", difficulty:"easy", topic:"React Core", tags:["react","forms","state"], attempted:false, hints:["Controlled: React owns state","Uncontrolled: DOM owns state","When to use refs","Form libraries like react-hook-form"] },
  { id:"f8", text:"How does the browser render a webpage? Explain the critical rendering path.", role:"frontend", difficulty:"hard", topic:"Browser", tags:["browser","performance","rendering","paint"], attempted:false, hints:["HTML→DOM, CSS→CSSOM","Render tree construction","Layout and paint phases","Reflow vs repaint cost"] },
  { id:"f9", text:"Explain CSS Grid vs Flexbox. When would you choose one over the other?", role:"frontend", difficulty:"easy", topic:"CSS", tags:["css","grid","flexbox","layout"], attempted:false, hints:["1D vs 2D layouts","Grid for page structure","Flexbox for component layout","Alignment superpowers of each"] },
  { id:"f10", text:"What are Web Workers and when would you use them in a frontend application?", role:"frontend", difficulty:"hard", topic:"Browser", tags:["javascript","workers","performance","threading"], attempted:false, hints:["Off-main-thread execution","No DOM access","Use for heavy computation","Communication via postMessage"] },
  { id:"b1", text:"Explain the difference between authentication and authorization. How would you implement both in Node.js?", role:"backend", difficulty:"medium", topic:"Security", tags:["auth","jwt","security","middleware"], attempted:false, hints:["Auth: who are you","Authz: what can you do","JWT structure and signing","Role-based access control"] },
  { id:"b2", text:"What is the N+1 query problem and how do you solve it in Mongoose?", role:"backend", difficulty:"medium", topic:"Database", tags:["mongodb","mongoose","performance","query"], attempted:false, hints:["One query per related doc","Use populate() carefully","Aggregation pipeline solution","Dataloader pattern"] },
  { id:"b3", text:"Describe RESTful API design principles. What makes an API truly RESTful?", role:"backend", difficulty:"easy", topic:"API Design", tags:["rest","api","http","design"], attempted:false, hints:["Stateless communication","Resource-based URLs","HTTP verbs semantics","HATEOAS principle"] },
  { id:"b4", text:"How does Node.js handle asynchronous operations using the event loop?", role:"backend", difficulty:"hard", topic:"Node.js", tags:["nodejs","async","eventloop","concurrency"], attempted:false, hints:["Single-threaded non-blocking","Call stack vs callback queue","Microtasks vs macrotasks","libuv thread pool"] },
  { id:"b5", text:"What is database indexing? When should you use it and what are the trade-offs?", role:"backend", difficulty:"medium", topic:"Database", tags:["database","indexing","performance","mongodb"], attempted:false, hints:["B-tree data structure","Speeds up reads, slows writes","Compound vs single field","When NOT to index"] },
  { id:"fs1", text:"Explain SSR, SSG, ISR, and CSR in Next.js. When would you choose each approach?", role:"fullstack", difficulty:"hard", topic:"Next.js", tags:["nextjs","ssr","ssg","rendering"], attempted:false, hints:["SSR: fresh on every request","SSG: built at compile time","ISR: revalidate on interval","CSR: client fetches data"] },
  { id:"fs2", text:"How would you design a real-time notification system that scales to millions of users?", role:"fullstack", difficulty:"hard", topic:"Architecture", tags:["websockets","scaling","redis","pubsub"], attempted:false, hints:["WebSockets or SSE","Redis pub/sub for fanout","Message queues","Connection management at scale"] },
  { id:"fs3", text:"Walk me through the JWT authentication flow from login to accessing a protected API route.", role:"fullstack", difficulty:"medium", topic:"Auth", tags:["jwt","auth","security","nextjs"], attempted:false, hints:["Login: verify credentials","Sign JWT with secret","Send in Authorization header","Verify on every protected route"] },
  { id:"d1", text:"Explain binary search. What are the prerequisites and what is its time/space complexity?", role:"dsa", difficulty:"easy", topic:"Searching", tags:["binary-search","arrays","complexity","algorithms"], attempted:false, hints:["Sorted array required","O(log n) time","O(1) space iterative","Divide search space in half"] },
  { id:"d2", text:"What is dynamic programming? Explain the concept with the classic coin change problem.", role:"dsa", difficulty:"hard", topic:"Dynamic Programming", tags:["dp","memoization","tabulation","optimization"], attempted:false, hints:["Optimal substructure","Overlapping subproblems","Top-down memoization","Bottom-up tabulation"] },
  { id:"d3", text:"How does a hash table work internally? What are collisions and how are they resolved?", role:"dsa", difficulty:"medium", topic:"Data Structures", tags:["hashtable","collision","chaining","probing"], attempted:false, hints:["Hash function maps key to index","Chaining with linked lists","Open addressing / probing","Load factor and rehashing"] },
  { id:"d4", text:"Explain BFS vs DFS graph traversal. When would you use each?", role:"dsa", difficulty:"medium", topic:"Graphs", tags:["bfs","dfs","graphs","traversal"], attempted:false, hints:["BFS: queue, shortest path","DFS: stack/recursion, explore deep","BFS for level-order problems","DFS for cycle detection"] },
  { id:"s1", text:"How would you design a URL shortening service like bit.ly? Walk through your decisions.", role:"system", difficulty:"medium", topic:"System Design", tags:["system-design","hashing","databases","caching"], attempted:false, hints:["Base62 encoding for short URL","DB choice: SQL vs NoSQL","Cache hot URLs in Redis","Handle redirects at edge"] },
  { id:"s2", text:"Explain horizontal vs vertical scaling. When would you choose one over the other?", role:"system", difficulty:"easy", topic:"Scaling", tags:["scaling","architecture","cloud","load-balancing"], attempted:false, hints:["Vertical: bigger machine","Horizontal: more machines","Stateless vs stateful","Cost and ceiling differences"] },
  { id:"s3", text:"What is the CAP theorem and what are its practical implications for choosing a database?", role:"system", difficulty:"hard", topic:"Distributed Systems", tags:["cap","consistency","availability","partition"], attempted:false, hints:["Can only guarantee 2 of 3","CP: MongoDB, HBase","AP: Cassandra, DynamoDB","Network partitions always happen"] },
];

const ROLES = [
  { id:"all",       label:"All",          emoji:"◎", color:"#A5B4FC" },
  { id:"frontend",  label:"Frontend",     emoji:"⚛", color:"#38BDF8" },
  { id:"backend",   label:"Backend",      emoji:"⚙", color:"#34D399" },
  { id:"fullstack", label:"Full Stack",   emoji:"⬡", color:"#C084FC" },
  { id:"dsa",       label:"DSA",          emoji:"◈", color:"#FB923C" },
  { id:"system",    label:"System Design",emoji:"✦", color:"#F472B6" },
];

const DIFF_CONFIG = {
  easy:   { label:"Easy",   color:"#4ADE80", dim:"rgba(74,222,128,0.1)",  border:"rgba(74,222,128,0.2)"  },
  medium: { label:"Medium", color:"#FCD34D", dim:"rgba(252,211,77,0.1)",  border:"rgba(252,211,77,0.2)"  },
  hard:   { label:"Hard",   color:"#F87171", dim:"rgba(248,113,113,0.1)", border:"rgba(248,113,113,0.2)" },
};

const scoreColor = (s: number) => s >= 80 ? "#4ADE80" : s >= 60 ? "#FCD34D" : "#F87171";

// ── QUESTION CARD ─────────────────────────────────────────────
function QuestionCard({ q, idx }: { q: Question; idx: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const diff = DIFF_CONFIG[q.difficulty];
  const role = ROLES.find(r => r.id === q.role) || ROLES[0];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: idx * 0.04 }}
      style={{
        borderRadius: 14,
        border: `1px solid ${open ? diff.border : "rgba(255,255,255,0.055)"}`,
        background: open ? diff.dim : "rgba(255,255,255,0.018)",
        transition: "border-color 0.25s, background 0.25s",
        overflow: "hidden",
      }}
    >
      {/* ── row ── */}
      <div
        style={{ display:"flex", alignItems:"flex-start", gap:"0.875rem",
                  padding:"1rem 1.125rem", cursor:"pointer" }}
        onClick={() => setOpen(o => !o)}
      >
        {/* status dot */}
        <div style={{ marginTop:3, flexShrink:0 }}>
          {q.attempted ? (
            <div style={{
              width:20, height:20, borderRadius:"50%", display:"flex",
              alignItems:"center", justifyContent:"center",
              background:`${scoreColor(q.bestScore||0)}14`,
              border:`1.5px solid ${scoreColor(q.bestScore||0)}`,
              fontSize:9, fontWeight:700, color:scoreColor(q.bestScore||0),
              fontFamily:"'Roboto Mono', monospace",
            }}>{q.bestScore}</div>
          ) : (
            <div style={{ width:20, height:20, borderRadius:"50%",
                           border:"1.5px dashed rgba(255,255,255,0.12)" }} />
          )}
        </div>

        {/* question text */}
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{
            fontSize:14, lineHeight:1.65, color:"rgba(255,255,255,0.78)",
            margin:"0 0 0.5rem", fontFamily:"'Lora', serif", fontWeight:400,
          }}>{q.text}</p>
          <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
            <span style={{
              fontSize:10, padding:"2px 8px", borderRadius:100, fontWeight:600,
              background:diff.dim, border:`1px solid ${diff.border}`,
              color:diff.color, letterSpacing:"0.04em",
            }}>{diff.label}</span>
            <span style={{
              fontSize:10, padding:"2px 8px", borderRadius:100,
              background:`${role.color}12`, border:`1px solid ${role.color}20`,
              color:role.color, letterSpacing:"0.04em",
            }}>{q.topic}</span>
            {q.tags.slice(0,2).map(t => (
              <span key={t} style={{ fontSize:10, color:"rgba(255,255,255,0.18)",
                                      fontFamily:"'Roboto Mono', monospace" }}>#{t}</span>
            ))}
          </div>
        </div>

        {/* right actions */}
        <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          {q.attempted && (
            <span style={{ fontSize:11, color:scoreColor(q.bestScore||0),
                            fontFamily:"'Roboto Mono', monospace", fontWeight:600 }}>
              {q.bestScore}pts
            </span>
          )}
          <Link
            href={`/interview/setup?role=${q.role}`}
            onClick={e => e.stopPropagation()}
            style={{
              fontSize:12, padding:"5px 12px", borderRadius:8, textDecoration:"none",
              background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.25)",
              color:"#A5B4FC", transition:"all 0.2s", whiteSpace:"nowrap",
            }}
          >Practice</Link>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration:0.2 }}
            style={{ color:"rgba(255,255,255,0.2)", fontSize:18, lineHeight:1, userSelect:"none" }}>
            +
          </motion.span>
        </div>
      </div>

      {/* ── expanded hints ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height:0, opacity:0 }}
            animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.22 }}
            style={{ overflow:"hidden" }}
          >
            <div style={{
              margin:"0 1.125rem 1.125rem",
              padding:"0.875rem 1rem",
              borderRadius:12,
              background:"rgba(99,102,241,0.07)",
              border:"1px solid rgba(99,102,241,0.14)",
            }}>
              <p style={{ fontSize:10, color:"rgba(165,180,252,0.65)", textTransform:"uppercase",
                           letterSpacing:"0.12em", fontWeight:700, margin:"0 0 10px",
                           fontFamily:"'Roboto Mono', monospace" }}>
                Cover in your answer
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 1.5rem" }}>
                {q.hints.map((h, i) => (
                  <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                    <span style={{ color:"rgba(165,180,252,0.5)", fontWeight:700, fontSize:10,
                                    fontFamily:"'Roboto Mono', monospace", flexShrink:0, marginTop:2 }}>
                      {String(i+1).padStart(2,"0")}
                    </span>
                    <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)", lineHeight:1.55 }}>{h}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:6, marginTop:"0.75rem", flexWrap:"wrap" }}>
                {q.tags.map(t => (
                  <span key={t} style={{
                    fontSize:10, padding:"2px 8px", borderRadius:100,
                    background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
                    color:"rgba(255,255,255,0.25)", fontFamily:"'Roboto Mono', monospace",
                  }}>#{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────
export default function QuestionsPage() {
  const [role,     setRole]     = useState("all");
  const [diff,     setDiff]     = useState("all");
  const [search,   setSearch]   = useState("");
  const [status,   setStatus]   = useState<"all"|"done"|"todo">("all");
  const [topic,    setTopic]    = useState("All Topics");

  const topics = useMemo(() => {
    const set = new Set(ALL_QUESTIONS.map(q => q.topic));
    return ["All Topics", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    return ALL_QUESTIONS.filter(q => {
      if (role !== "all" && q.role !== role) return false;
      if (diff !== "all" && q.difficulty !== diff) return false;
      if (topic !== "All Topics" && q.topic !== topic) return false;
      if (status === "done" && !q.attempted) return false;
      if (status === "todo" && q.attempted) return false;
      if (search) {
        const s = search.toLowerCase();
        return q.text.toLowerCase().includes(s) ||
               q.topic.toLowerCase().includes(s) ||
               q.tags.some(t => t.includes(s));
      }
      return true;
    });
  }, [role, diff, topic, status, search]);

  const attempted = ALL_QUESTIONS.filter(q => q.attempted).length;
  const avgBest   = Math.round(
    ALL_QUESTIONS.filter(q => q.attempted && q.bestScore)
      .reduce((a,q) => a+(q.bestScore||0), 0) / (attempted||1)
  );

  const activeRole = ROLES.find(r => r.id === role) || ROLES[0];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Roboto+Mono:wght@400;500&family=Manrope:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
        input, select, button { font-family:inherit; }
        input::placeholder { color:rgba(255,255,255,0.15); }
        input:focus, select:focus { outline:none; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.07); border-radius:3px; }
        select option { background:#0C0E15; color:#E2E8F0; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.45} }
        .pulse { animation: pulse 2s ease-in-out infinite; }
      `}</style>

      <div style={{ fontFamily:"'Manrope', sans-serif", minHeight:"100vh",
                    background:"#0C0E15", color:"#E2E8F0" }}>

        {/* ── BG ───────────────────────────────────────────── */}
        <div style={{
          position:"fixed", inset:0, pointerEvents:"none",
          background:`radial-gradient(ellipse 60% 40% at 10% 15%, rgba(99,102,241,0.07) 0%, transparent 60%),
                      radial-gradient(ellipse 40% 30% at 90% 85%, rgba(168,85,247,0.04) 0%, transparent 55%)`,
        }}/>
        <div style={{
          position:"fixed", inset:0, pointerEvents:"none",
          backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.009) 1px, transparent 1px)",
          backgroundSize:"30px 30px",
        }}/>

        {/* ── NAV ──────────────────────────────────────────── */}
        <nav style={{
          position:"sticky", top:0, zIndex:50,
          background:"rgba(12,14,21,0.9)", backdropFilter:"blur(18px)",
          borderBottom:"1px solid rgba(255,255,255,0.05)",
          padding:"0.875rem 1.75rem",
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
            <Link href="/dashboard" style={{
              color:"rgba(255,255,255,0.28)", fontSize:13, textDecoration:"none",
              display:"flex", alignItems:"center", gap:6,
            }}>← Dashboard</Link>
            <div style={{ width:1, height:16, background:"rgba(255,255,255,0.07)" }}/>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{
                width:26, height:26, borderRadius:8,
                background:"linear-gradient(135deg, #6366F1, #8B5CF6)",
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:13,
              }}>⚡</div>
              <span style={{ fontSize:14, fontWeight:600, color:"rgba(255,255,255,0.75)" }}>PrepAI</span>
            </div>
          </div>

          {/* progress pill */}
          <div style={{
            display:"flex", alignItems:"center", gap:10,
            background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:100, padding:"5px 14px",
          }}>
            <div style={{ width:70, height:3, background:"rgba(255,255,255,0.06)",
                           borderRadius:2, overflow:"hidden" }}>
              <div style={{
                width:`${(attempted/ALL_QUESTIONS.length)*100}%`, height:"100%",
                background:"linear-gradient(90deg, #6366F1, #4ADE80)", borderRadius:2,
              }}/>
            </div>
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)",
                            fontFamily:"'Roboto Mono', monospace" }}>
              {attempted}/{ALL_QUESTIONS.length}
            </span>
          </div>
        </nav>

        <div style={{ maxWidth:960, margin:"0 auto", padding:"2.5rem 1.5rem",
                       position:"relative", zIndex:1 }}>

          {/* ── HEADER ───────────────────────────────────── */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            style={{ marginBottom:"2.5rem" }}>

            <div style={{ display:"flex", alignItems:"flex-end",
                           justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
              <div>
                <p style={{ fontSize:10, color:"rgba(165,180,252,0.7)", textTransform:"uppercase",
                              letterSpacing:"0.14em", fontWeight:700, margin:"0 0 10px",
                              fontFamily:"'Roboto Mono', monospace" }}>
                  ◆ Question Bank
                </p>
                <h1 style={{
                  fontFamily:"'Lora', serif", fontWeight:600,
                  fontSize:"clamp(26px, 4vw, 42px)", lineHeight:1.1,
                  color:"rgba(255,255,255,0.9)", margin:"0 0 8px",
                }}>
                  {ALL_QUESTIONS.length} questions.<br/>
                  <em style={{ color:"#A5B4FC", fontStyle:"italic" }}>
                    Practice until it clicks.
                  </em>
                </h1>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.28)", margin:0,
                              maxWidth:460, lineHeight:1.7 }}>
                  Browse by role, filter by difficulty, expand any question to see what you should cover.
                </p>
              </div>

              <div style={{ display:"flex", gap:"1.5rem" }}>
                {[
                  { v:attempted,                      l:"Attempted", c:"#4ADE80" },
                  { v:`${avgBest}pts`,                l:"Avg best",  c:"#FCD34D" },
                  { v:ALL_QUESTIONS.length-attempted, l:"Remaining", c:"#A5B4FC" },
                ].map(({ v, l, c }) => (
                  <div key={l} style={{ textAlign:"right" }}>
                    <div style={{ fontSize:24, fontWeight:700, color:c, lineHeight:1,
                                   fontFamily:"'Lora', serif" }}>{v}</div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.22)", marginTop:2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── ROLE TABS ─────────────────────────────────── */}
          <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.1 }}
            style={{ display:"flex", gap:5, marginBottom:"1.25rem", flexWrap:"wrap" }}>
            {ROLES.map(r => (
              <button key={r.id} onClick={() => setRole(r.id)} style={{
                display:"flex", alignItems:"center", gap:6,
                padding:"7px 14px", borderRadius:100, fontSize:13,
                cursor:"pointer", transition:"all 0.2s", border:"none",
                background:role===r.id ? `${r.color}18` : "rgba(255,255,255,0.04)",
                color:role===r.id ? r.color : "rgba(255,255,255,0.32)",
                outline:role===r.id ? `1px solid ${r.color}30` : "1px solid transparent",
                fontFamily:"'Manrope', sans-serif", fontWeight:role===r.id ? 600 : 400,
              }}>
                <span style={{ fontSize:13 }}>{r.emoji}</span>
                {r.label}
                <span style={{ fontSize:10, fontFamily:"'Roboto Mono', monospace",
                                color:role===r.id ? `${r.color}80` : "rgba(255,255,255,0.18)" }}>
                  {r.id==="all" ? ALL_QUESTIONS.length : ALL_QUESTIONS.filter(q=>q.role===r.id).length}
                </span>
              </button>
            ))}
          </motion.div>

          {/* ── FILTER BAR ────────────────────────────────── */}
          <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.15 }}
            style={{ display:"flex", gap:8, marginBottom:"1.25rem",
                      flexWrap:"wrap", alignItems:"center" }}>

            {/* search */}
            <div style={{ position:"relative", flex:1, minWidth:180 }}>
              <span style={{ position:"absolute", left:11, top:"50%",
                              transform:"translateY(-50%)", fontSize:13,
                              color:"rgba(255,255,255,0.2)" }}>⌕</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search questions or tags…"
                style={{
                  width:"100%", padding:"8px 12px 8px 30px", borderRadius:10,
                  fontSize:13, background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.07)",
                  color:"rgba(255,255,255,0.75)",
                }}
              />
            </div>

            {/* difficulty */}
            <select value={diff} onChange={e => setDiff(e.target.value)} style={{
              padding:"8px 12px", borderRadius:10, fontSize:13, cursor:"pointer",
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
              color:"rgba(255,255,255,0.5)",
            }}>
              <option value="all">All Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            {/* topic */}
            <select value={topic} onChange={e => setTopic(e.target.value)} style={{
              padding:"8px 12px", borderRadius:10, fontSize:13, cursor:"pointer",
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
              color:"rgba(255,255,255,0.5)",
            }}>
              {topics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {/* status toggle */}
            <div style={{ display:"flex", background:"rgba(255,255,255,0.04)",
                           border:"1px solid rgba(255,255,255,0.07)",
                           borderRadius:10, padding:3 }}>
              {(["all","done","todo"] as const).map(s => (
                <button key={s} onClick={() => setStatus(s)} style={{
                  padding:"5px 10px", borderRadius:7, fontSize:12, cursor:"pointer",
                  border:"none", transition:"all 0.2s",
                  background:status===s ? "rgba(99,102,241,0.2)" : "transparent",
                  color:status===s ? "#A5B4FC" : "rgba(255,255,255,0.28)",
                  textTransform:"capitalize",
                }}>{s}</button>
              ))}
            </div>

            <span style={{ fontSize:11, color:"rgba(255,255,255,0.18)",
                            fontFamily:"'Roboto Mono', monospace", marginLeft:"auto" }}>
              {filtered.length} results
            </span>
          </motion.div>

          {/* ── PRACTICE BANNER ───────────────────────────── */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
            style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"0.875rem 1.25rem", borderRadius:14, marginBottom:"1.25rem",
              background:"linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.06))",
              border:"1px solid rgba(99,102,241,0.16)", flexWrap:"wrap", gap:"0.75rem",
            }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div className="pulse" style={{ width:7, height:7, borderRadius:"50%",
                                               background:"#4ADE80" }}/>
              <span style={{ fontSize:13, color:"rgba(255,255,255,0.55)" }}>
                Want a full mock interview instead of individual questions?
              </span>
            </div>
            <Link href="/interview/setup" style={{
              display:"flex", alignItems:"center", gap:7, padding:"7px 16px",
              borderRadius:10, textDecoration:"none",
              background:"rgba(99,102,241,0.25)", border:"1px solid rgba(99,102,241,0.3)",
              color:"#A5B4FC", fontSize:13, fontWeight:500,
            }}>
              Start interview →
            </Link>
          </motion.div>

          {/* ── QUESTIONS LIST ────────────────────────────── */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                {filtered.map((q, i) => (
                  <QuestionCard key={q.id} q={q} idx={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                style={{
                  textAlign:"center", padding:"5rem 2rem",
                  background:"rgba(255,255,255,0.015)",
                  border:"1px solid rgba(255,255,255,0.05)", borderRadius:20,
                }}>
                <div style={{ fontSize:36, marginBottom:12 }}>◎</div>
                <p style={{ fontSize:16, color:"rgba(255,255,255,0.45)",
                              fontFamily:"'Lora', serif", margin:"0 0 6px" }}>
                  No questions match
                </p>
                <p style={{ fontSize:13, color:"rgba(255,255,255,0.2)", margin:"0 0 1.25rem" }}>
                  Try adjusting your filters
                </p>
                <button onClick={() => {
                  setRole("all"); setDiff("all");
                  setTopic("All Topics"); setSearch(""); setStatus("all");
                }} style={{
                  padding:"8px 18px", borderRadius:10, fontSize:13, cursor:"pointer",
                  background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.25)",
                  color:"#A5B4FC",
                }}>Clear filters</button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── BOTTOM CTA ────────────────────────────────── */}
          {filtered.length > 0 && (
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }}
              style={{
                marginTop:"2rem", padding:"1.75rem",
                background:"rgba(255,255,255,0.018)",
                border:"1px solid rgba(255,255,255,0.05)", borderRadius:20,
                display:"flex", alignItems:"center",
                justifyContent:"space-between", flexWrap:"wrap", gap:"1rem",
              }}>
              <div>
                <p style={{ fontSize:18, color:"rgba(255,255,255,0.75)", margin:"0 0 4px",
                              fontFamily:"'Lora', serif" }}>
                  Test yourself for real
                </p>
                <p style={{ fontSize:13, color:"rgba(255,255,255,0.25)", margin:0 }}>
                  Start a full session and get AI feedback on every answer.
                </p>
              </div>
              <Link href="/interview/setup" style={{
                display:"inline-flex", alignItems:"center", gap:8,
                padding:"10px 22px", borderRadius:12, textDecoration:"none",
                background:"linear-gradient(135deg, #6366F1, #8B5CF6)",
                color:"#fff", fontSize:14, fontWeight:600,
              }}>
                Start mock interview
                <span>→</span>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}