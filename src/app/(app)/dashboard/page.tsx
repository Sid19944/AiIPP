"use client";


import Radarchart from "@/components/dashboard/charts/RadarChartCard";
import ScoreChart from "@/components/dashboard/charts/ScoreChartCard";
import StatCard from "@/components/dashboard/StatCard";
import DashNav from "@/components/NavBars/DashNav";
import { Mic, TrendingUp, Target, Award, ArrowUpRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";


function page() {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const user = session.data?.user;
  return (
    <div
      className="min-h-screen bg-[#08080F] flex]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <DashNav />

      <main className="flex-1 p-2 md:p-6 space-y-6 overflow-y-auto">
        <div id="stats" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            delay={0}
            label="Total sessions"
            value="14"
            sub="All time"
            icon={Mic}
            color="#6C63FF"
          />
          <StatCard
            delay={1}
            label="Average score"
            value="74"
            sub="pts"
            icon={TrendingUp}
            color="#22C55E"
          />
          <StatCard
            delay={2}
            label="Questions answered"
            value="87"
            sub="total"
            icon={Target}
            color="#F59E0B"
          />
          <StatCard
            delay={3}
            label="Interview readiness"
            value="72%"
            sub="score"
            icon={Award}
            color="#FF6B6B"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <ScoreChart/>
          <Radarchart/>
        </div>
      </main>
    </div>
  );
}

export default page;
