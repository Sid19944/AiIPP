"use client";

import { motion } from "framer-motion";
import ScoreChartCard from "@/components/dashboard/charts/ScoreChartCard";
import Brackdown from "@/components/interview-session/Brackdown";
import { useResult } from "@/context/ResultProvider";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import RadialScore from "@/components/result/RadialScore";
import { ScoreHistory } from "@/components/dashboard/charts/ScoreChartCard";

function page() {
  const { id } = useParams();
  const { getSession, session, getAnswers, answers } = useResult();

  useEffect(() => {
    getSession(id as string);
    getAnswers(id as string);
  }, []);

  const scoreHistory: ScoreHistory[] = [];

  if (answers.length > 0) {
    answers.map((ans, idx) => {
      scoreHistory.push({ label: `Q${idx + 1}`, score: ans.score });
    });
  }

  return (
    <div className="w-full min-h-screen mx-auto p-2 md:p-6 space-y-4 bg-[#08080F] text-white">
      <div className="border rounded-2xl border-white/8 p-5 bg-[#0D0D13]">
        <RadialScore
          session={session}
        />
      </div>
      <ScoreChartCard
        scoreHistory={scoreHistory}
        heading="Score per question"
        subHeading={`How each question performed`}
      />

      <div className="p-5 border border-white/8 rounded-2xl bg-[#0D0D13] gap-3 flex flex-col">
        <h1>Score brackdown</h1>
        <div className="flex flex-col gap-1">
          <Brackdown score={session?.avgAccuracy || 0} label="Accuracy" />
          <Brackdown score={session?.avgDepth || 0} label="Depth" />
          <Brackdown score={session?.avgClarity || 0} label="Clarity" />
          <Brackdown score={session?.avgScore || 0} label="Overall" />
        </div>
      </div>
    </div>
  );
}

export default page;
