"use client";

import { fadeUp } from "@/lib/animation";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

const roles = [
  {
    id: "frontend",
    emoji: "⚛️",
    label: "Frontend Dev",
    desc: "React, CSS, Browser APIs, Performance",
    topics: ["React", "CSS", "JavaScript", "TypeScript", "Performance"],
    color: "#38BDF8",
    bg: "rgba(56,189,248,0.08)",
    border: "rgba(56,189,248,0.2)",
  },
  {
    id: "backend",
    emoji: "⚙️",
    label: "Backend Dev",
    desc: "Node.js, APIs, Databases, Auth",
    topics: ["Node.js", "REST APIs", "MongoDB", "Auth", "Security"],
    color: "#34D399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
  },
  {
    id: "fullstack",
    emoji: "🌐",
    label: "Full Stack",
    desc: "End-to-end development, architecture",
    topics: ["React", "Node.js", "Databases", "Deployment", "Architecture"],
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
  },
  {
    id: "dsa",
    emoji: "🧮",
    label: "DSA",
    desc: "Arrays, Trees, Graphs, Dynamic Programming",
    topics: ["Arrays", "Trees", "Graphs", "DP", "Sorting"],
    color: "#FB923C",
    bg: "rgba(251,146,60,0.08)",
    border: "rgba(251,146,60,0.2)",
  },
  {
    id: "system",
    emoji: "🏗️",
    label: "System Design",
    desc: "Scalability, Architecture, Distributed Systems",
    topics: [
      "Scalability",
      "Caching",
      "Load Balancing",
      "Databases",
      "Microservices",
    ],
    color: "#F472B6",
    bg: "rgba(244,114,182,0.08)",
    border: "rgba(244,114,182,0.2)",
  },
  {
    id: "devops",
    emoji: "🚀",
    label: "DevOps",
    desc: "CI/CD, Docker, Kubernetes, Cloud",
    topics: ["Docker", "CI/CD", "AWS", "Kubernetes", "Monitoring"],
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.2)",
  },
];

function ChooseRole({
  selectedRole,
  setSelectedRole,
}: {
  selectedRole: string;
  setSelectedRole: (id: string) => void;
}) {
  return (
    <motion.div
      key="role"
      className="flex flex-col  "
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {roles.map((r, i) => (
          <motion.button
            key={r.id}
            custom={i}
            onClick={() => setSelectedRole(r.id)}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className={` flex cursor-pointer flex-col border p-5 rounded-2xl text-gray-600 relatice text-left transition-all duration-200 group overflow-hidden gap-3 ${
              selectedRole == r.id
                ? "border-opacity-100"
                : "border-white/8 hover:border-white/15 hover:scale-[1.01]"
            }`}
            style={{
              background:
                selectedRole === r.id ? r.bg : "rgba(255,255,255,0.02)",
              borderColor: selectedRole === r.id ? r.border : "",
            }}
          >
            <div className={`text-3xl flex justify-between`}>
              {r.emoji}
              {selectedRole === r.id && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <CheckCircle2 size={15} style={{ color: r.color }} />
                </motion.div>
              )}
            </div>
            <span className="text-sm md:text-lg text-white font-semibold ">
              {r.label}
            </span>
            <p className="tracking-tight text-xs md:text-sm">{r.desc}</p>
            <div className="flex gap-2 text-xs md:text-sm flex-wrap">
              {r.topics.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-md px-2 py-0.5"
                  style={{ background: `${r.color}15`, color: r.color }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default ChooseRole;
