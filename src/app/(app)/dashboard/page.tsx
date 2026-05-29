"use client";

import { motion } from "framer-motion";
import { StatsIt } from "@/app/api/dashboard/get-stat/route";
import { SessionsIt } from "@/app/api/sessions/get-all/[page]/route";
import ScoreChart, {
  ScoreHistory,
} from "@/components/dashboard/charts/ScoreChartCard";
import StatCard from "@/components/dashboard/StatCard";
import DashNav from "@/components/NavBars/DashNav";
import SessionCard from "@/components/sessions/SessionCard";
import axios from "axios";
import { Mic, TrendingUp, Target, Award } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fadeUp } from "@/lib/animation";
import ReadyCTA from "@/components/dashboard/ReadyCTA";

interface AchivementsIt {
  id: string;
  label: string;
  icon: React.ReactElement;
}

const AchivementsData: AchivementsIt[] = [
  {
    id: "50qs",
    label: "50 questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-biceps-flexed-icon lucide-biceps-flexed"
      >
        <path d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1" />
        <path d="M15 14a5 5 0 0 0-7.584 2" />
        <path d="M9.964 6.825C8.019 7.977 9.5 13 8 15" />
      </svg>
    ),
  },
  {
    id: "100+qs",
    label: "100+ questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-rocket-icon lucide-rocket"
      >
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
        <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
      </svg>
    ),
  },
  {
    id: "score",
    label: "First 90+ score",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-target-icon lucide-target"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: "avg",
    label: "Avg 85+",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-crown-icon lucide-crown"
      >
        <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
        <path d="M5 21h14" />
      </svg>
    ),
  },
];

function page() {
  const session = useSession();
  const user = session.data?.user;

  const [stats, setStats] = useState<StatsIt | null>(null);
  const [sessions, setSessions] = useState<SessionsIt[] | []>([]);
  const [achUl, setAchUl] = useState(0);

  useEffect(() => {
    getStats();
    getSessionHistory();
  }, []);

  const getStats = () => {
    axios
      .get(`/api/dashboard/get-stat`)
      .then((res) => {
        setStats(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getSessionHistory = () => {
    axios
      .get(`/api/dashboard/get-session-history`)
      .then((res) => {
        setSessions(res.data.sessions);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const scoreHistory: ScoreHistory[] = [];
  if (sessions.length > 0) {
    sessions.map((s, idx) => {
      scoreHistory.push({
        label: `S${idx + 1}`,
        score: Number(s.avgScore.toFixed(0)),
      });
    });
  }

  useEffect(() => {
    if (stats) {
      stats.bestScore > 90 && setAchUl((prev) => prev + 1);
      stats.answeredQs >= 50 && setAchUl((prev) => prev + 1);
      stats.answeredQs > 100 && setAchUl((prev) => prev + 1);
      stats.avgScore > 85 && setAchUl((prev) => prev + 1);
    }
  }, [stats]);

  return (
    <div
      className="min-h-screen bg-[#08080F]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <DashNav />

      <main className="flex-1 p-2 md:p-6 space-y-6 overflow-y-auto">
        <div id="stats" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            delay={0}
            label="Total sessions"
            value={stats?.totalSession}
            sub="All time"
            icon={Mic}
            color="#6C63FF"
          />
          <StatCard
            delay={1}
            label="Average score"
            value={stats?.avgScore.toFixed(0)}
            sub="pts"
            icon={TrendingUp}
            color="#22C55E"
          />
          <StatCard
            delay={2}
            label="Questions answered"
            value={stats?.answeredQs || 0}
            sub="total"
            icon={Target}
            color="#F59E0B"
          />
          <StatCard
            delay={3}
            label="Interview readiness"
            value={`${stats?.readiness.toFixed(0) || 0}%`}
            sub="score"
            icon={Award}
            color="#FF6B6B"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <ScoreChart
            scoreHistory={scoreHistory}
            heading="Score trend"
            subHeading="Last 10 session"
            avgScore={Number(stats?.avgScore.toFixed(0) || 0)}
          />
        </div>

        <div className="text-white flex flex-col gap-3 border rounded-2xl p-1 py-3 border-white/8">
          <div>
            <h1 className="text-lg font-semibold">Recent Session</h1>
            <p className="text-gray-400 leading-1">Last 5 sessions</p>
          </div>
          <div className="grid gap-2">
            {sessions.slice(0, 5).map((el, idx, sessions) => (
              <SessionCard key={idx} el={el} idx={idx} sessions={sessions} />
            ))}
          </div>
        </div>

        <div className="border text-white p-5 gap-5 flex flex-col  rounded-2xl border-white/8 bg-white/3">
          <div className="text-lg font-semibold">
            <h1>Achivements</h1>
            <p className="text-sm font-normal text-gray-400">
              {achUl} of 4 unlocked
            </p>
          </div>

          <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
            {AchivementsData.map((el, idx) => (
              <div
                key={el.id}
                className="flex flex-col justify-center items-center gap-1"
              >
                <div
                  className={`${el.id === "score" && stats?.bestScore && stats?.bestScore > 90 ? "text-red-400" : el.id === "50qs" && stats?.answeredQs && stats.answeredQs >= 50 ? "text-yellow-300" : el.id === "100+qs" && stats?.answeredQs && stats.answeredQs > 100 ? "text-blue-600" : el.id === "avg" && stats?.avgScore && stats.avgScore > 85 ? "text-orange-700" : "text-gray-400"} p-2 rounded-lg bg-[#1B1A35] `}
                >
                  {el.icon}
                </div>
                <h1>{el.label}</h1>
              </div>
            ))}
          </div>
        </div>

        <ReadyCTA stats={stats} />
      </main>
    </div>
  );
}

export default page;
