"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animation";
import {
  Mic,
  TrendingUp,
  Target,
  Award,
  BookOpen,
  Play,
  CheckCircle2,
  Star,
  BarChart2,
} from "lucide-react";
import Link from "next/link";
import { StatsIt } from "@/app/api/dashboard/get-stat/route";

function ReadyCTA({ stats }:{stats : StatsIt | null}) {
  return (
    <motion.div
      custom={1}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="lg:col-span-3 rounded-2xl p-6 relative overflow-hidden
                         bg-gradient-to-br from-[#6C63FF] to-[#5B52EE] border border-[#6C63FF]/30"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/5" />
      <div className="absolute -right-2 -bottom-2 w-24 h-24 rounded-full bg-white/5" />

      <div className="relative">
        <div
          className="inline-flex items-center gap-2 bg-white/10 text-white/80
                                px-3 py-1 rounded-full text-xs mb-4"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI Ready
        </div>
        <h3
          className="text-white font-bold text-xl mb-2"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Ready to practice?
        </h3>
        <p className="text-white/60 text-sm mb-6 max-w-xs leading-relaxed">
          Start a new mock interview session and get instant AI feedback on your
          answers.
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/interview/setup"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white
                               text-[#6C63FF] text-sm font-semibold hover:bg-white/90
                               transition-all hover:-translate-y-0.5"
          >
            <Play size={14} /> Start Interview
          </Link>
          <Link
            href="/questions"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20
                               text-white text-sm font-medium hover:bg-white/10 transition-all"
          >
            <BookOpen size={14} /> Browse Questions
          </Link>
        </div>

        {/* quick stats */}
        <div className="flex items-center gap-4 mt-5 pt-5 border-t border-white/10">
          {[
            {
              icon: CheckCircle2,
              label: `${stats?.totalSession} sessions done`,
            },
            { icon: Star, label: `Best score: ${stats?.bestScore}` },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 text-xs text-white/50"
            >
              <Icon size={12} className="text-white/30" /> {label}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ReadyCTA;
