"use client";

import SessionCard from "@/components/sessions/SessionCard";
import StatCard from "@/components/sessions/StatCard";
import { SessionIt } from "@/models/session.model";
import axios from "axios";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import Filter from "@/components/sessions/Filter";
import { Button } from "@/components/ui/button";
import { SessionsIt } from "@/app/api/sessions/get-all/[page]/route";

const Roleoptions = [
  "All-Role",
  "frontend",
  "backend",
  "fullstack",
  "dsa",
  "system-design",
  "devops",
];

const DifficultyOptions = ["All-Difficulty", "easy", "medium", "hard"];

function page() {
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [sessions, setSessions] = useState<SessionsIt[] | []>([]);

  const activeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [page]);

  useEffect(() => {
    axios
      .get(`/api/sessions/get-all/${page}`)
      .then((res) => {
        setSessions(res.data.sessions);
        setPage(res.data.page);
        setPages(res.data.totalPage);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  const [selRole, setSelRole] = useState("All-Role");
  const [selDiff, setSelDiff] = useState("All-Difficulty");

  const filtered = useMemo(() => {
    let result = [...sessions];
    if (selRole !== "All-Role")
      result = result.filter((s) => s.role === selRole);
    if (selDiff !== "All-Difficulty")
      result = result.filter((s) => s.difficulty === selDiff);
    return result;
  }, [selDiff, selRole, sessions]);

  const stats = useMemo(() => {
    if (!sessions.length)
      return {
        totalSession: 0,
        avgScore: 0,
        bestScore: 0,
        avgClarity: 0,
      };

    return {
      totalSession: Number(sessions[0].totalSession),
      avgScore: Number(sessions[0].avgScoreOfDocs.toFixed(2)),
      bestScore: Number(sessions[0].bestScore.toFixed(2)),
      avgClarity: Number(sessions[0].avgClarityOfDocs.toFixed(2)),
    };
  }, [sessions.length]);

  return (
    <div
      className="min-h-screen bg-[#08080F] text-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <nav className="sticky top-0 z-10 bg-black/70 p-3 backdrop-blur border-b border-[#5e5d8a] flex justify-between items-center">
        <Link href="/dashboard" className="flex gap-2">
          <ArrowLeft />
          Dashboard
        </Link>

        <Link href="/interview/setup" className="p-3 rounded-lg bg-[#6864F1]">
          New Session +
        </Link>
      </nav>
      <div className="max-w-6xl m-auto flex flex-col gap-8 p-3">
        <div className="flex flex-col p-5 gap-3">
          <div className="border w-fit flex py-1 px-3 rounded-full text-sm items-center gap-1 text-[#6864F1] bg-[#131529] border-[#6864F1]">
            <Calendar size={15} /> SESSION HISTOTY
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
            className="text-4xl "
          >
            All <em>{sessions.length && sessions[0].totalSession}</em> sessions,
            <br />
            <em style={{ color: `#6864F1` }}>every detail</em>
          </h1>
          <p className="text-lg text-gray-400">
            Your complete interview history. Click any session to review
            feedback.
          </p>
        </div>
        <div
          id="stat-card"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 z-1 sticky top-0"
        >
          <StatCard
            i={1}
            score={stats.totalSession}
            label="Total sessions"
            subLabel=""
          />
          <StatCard
            i={2}
            score={stats.avgScore}
            label="Average score"
            subLabel="All time"
          />
          <StatCard
            i={3}
            score={stats.bestScore}
            label="Best score"
            subLabel="All time"
          />
          <StatCard
            i={4}
            score={stats.avgClarity}
            label="Average clarity"
            subLabel="All Time"
          />
        </div>
        <div
          id="filter-nav"
          className="sticky top-18 z-10 p-3 flex gap-3 justify-end"
        >
          <Filter value={selRole} setValue={setSelRole} options={Roleoptions} />
          <Filter
            value={selDiff}
            setValue={setSelDiff}
            options={DifficultyOptions}
          />
        </div>
        <div id="session-card" className="grid gap-2 z-2 backdrop-blur">
          {filtered.map((el, idx, sessions) => (
            <SessionCard
              key={el._id.toString()}
              el={el}
              idx={idx}
              sessions={sessions}
            />
          ))}
        </div>
        <div id="pagenation" className="flex gap-2 p-1 justify-center">
          <Button
            disabled={page == 1}
            className="cursor-pointer"
            onClick={() => setPage(Number(page) - 1)}
          >
            <ChevronLeft /> Previus
          </Button>
          <div className="overflow-auto flex gap-1">
            {Array.from({ length: pages }).map((_, idx) => (
              <div
                key={idx}
                ref={idx + 1 == page ? activeRef : null}
                onClick={() => setPage(idx + 1)}
                className={`border px-3 py-1 rounded-lg read-only cursor-pointer
                  hover:bg-[#6d6bb6] hover:text-white
                  ${idx + 1 == page ? "bg-[#6864F1] " : "border-gray-500 text-gray-500"}`}
              >
                {idx + 1}
              </div>
            ))}
          </div>
          <Button
            disabled={page == pages}
            className="cursor-pointer"
            onClick={() => setPage(Number(page) + 1)}
          >
            Next <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
