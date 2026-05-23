"use client";

import { motion } from "framer-motion";
import ScoreChartCard from "@/components/dashboard/charts/ScoreChartCard";
import Brackdown from "@/components/interview-session/Brackdown";
import { useResult } from "@/context/ResultProvider";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import RadialScore from "@/components/result/RadialScore";
import { ScoreHistory } from "@/components/dashboard/charts/ScoreChartCard";
import {
  CheckCircle2,
  Hash,
  Info,
  LayoutDashboard,
  Loader2Icon,
  MessageCircle,
  PartyPopper,
  ReplyIcon,
  RotateCcw,
  Star,
  Target,
} from "lucide-react";
import AnsweerInfo from "@/components/result/AnsweerInfo";
import RadialSvgCircle from "@/components/result/RadialSvgCircle";
import QuestionCard from "@/components/result/QuestionCard";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { AnswerIt } from "@/models/answer.model";
import Link from "next/link";

function page() {
  const { id } = useParams();
  const { getSession, session, getAnswers, answers } = useResult();

  useEffect(() => {
    getSession(id as string);
    getAnswers(id as string);
  }, []);

  const scoreHistory: ScoreHistory[] = [];

  let bestAns: AnswerIt | null = null;
  let needsWork: AnswerIt | null = null;

  if (answers.length > 0) {
    answers.map((ans, idx) => {
      scoreHistory.push({ label: `Q${idx + 1}`, score: ans.score });
    });

    bestAns = answers.reduce((higest, current) => {
      return current.score > higest.score ? current : higest;
    });

    needsWork = answers.reduce((lowest, current) => {
      return current.score < lowest.score ? current : lowest;
    });
  }

  return (
    <div className="w-full min-h-screen mx-auto p-2 md:p-6 space-y-4 bg-[#08080F] text-white">
      <div className="border rounded-2xl border-white/8 p-5 bg-[#0D0D13]">
        <RadialScore session={session} />
      </div>
      <ScoreChartCard
        scoreHistory={scoreHistory}
        avgScore={session?.avgScore}
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

      {/* best ans, needs work */}
      <div className="flex flex-col gap-5">
        <AnsweerInfo
          data={{
            icon: <Star />,
            label: "BEST ANSWER",
            q: bestAns?.question as string,
            score: bestAns?.score as number,
            msg: bestAns?.tips[0] as string,
            msgIcon: <CheckCircle2 />,
          }}
        />
        <AnsweerInfo
          data={{
            icon: <Target />,
            label: "NEEDS WORK",
            q: needsWork?.question as string,
            score: needsWork?.score as number,
            msg: needsWork?.tips[0] as string,
            msgIcon: <Info />,
          }}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Question breakdown</h1>
          <p className="text-sm text-gray-400">
            Click any row to expand detaild feedback
          </p>
        </div>

        <div className="">
          <Accordion type="single" collapsible className="flex-1 gap-3">
            {answers?.map((ans, idx) => (
              <QuestionCard ans={ans} key={`${ans._id}`} idx={idx} />
            ))}
          </Accordion>
        </div>
      </div>

      <div className="p-5 border flex flex-col rounded-2xl border-white/8 bg-[#1a1a2a] gap-3 items-center">
        <div className="flex items-center flex-col gap-2">
          <PartyPopper size={35} />
          <h1 className="text-xl">Excellent session!</h1>
          <p className="text-center text-gray-400">
            Study the feedback above, then come back for another round.
            Consistency is what separates good from great.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/interview/setup"
            className="flex gap-2 rounded-xl p-3 w-fit bg-[#6B63FF] text-xl items-center"
          >
            <RotateCcw />
            Practive Again
          </Link>
          <Link
            href="/dashboard"
            className="flex gap-2 rounded-xl p-3 w-fit border border-white/8 hover:border-white/50 text-xl items-center"
          >
            <LayoutDashboard/>
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
