"use client";

import { QuestionsIt } from "@/models/question.model";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const roleItems = [
  { label: "All", value: "all" },
  {
    label: "Frontend",
    value: "frontend",
    color: "#38BDF8",
    bg: "rgba(56,189,248,0.08)",
    border: "rgba(56,189,248,0.2)",
  },
  {
    label: "Backend",
    value: "backend",
    color: "#34D399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
  },
  {
    label: "Fullstack",
    value: "fullstack",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
  },
  {
    label: "System-Design",
    value: "system-design",
    color: "#F472B6",
    bg: "rgba(244,114,182,0.08)",
    border: "rgba(244,114,182,0.2)",
  },
  {
    label: "DSA",
    value: "dsa",
    color: "#FB923C",
    bg: "rgba(251,146,60,0.08)",
    border: "rgba(251,146,60,0.2)",
  },
  {
    label: "Devops",
    value: "devops",
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.2)",
  },
];

const difficultyItems = [
  { label: "All", value: "all" },
  {
    label: "Easy",
    value: "easy",
    color: "#34D399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
  },
  {
    label: "Medium",
    value: "medium",
    color: "#FB923C",
    bg: "rgba(251,146,60,0.08)",
    border: "rgba(251,146,60,0.2)",
  },
  {
    label: "Hard",
    value: "hard",
    color: "#F472B6",
    bg: "rgba(244,114,182,0.08)",
    border: "rgba(244,114,182,0.2)",
  },
];

function page() {
  const [questions, setQuestions] = useState<QuestionsIt[] | undefined>(
    undefined,
  );
  const [qsAttends, setQsAttends] = useState<string[] | null | undefined>(null);

  const [role, setRole] = useState("all");
  const [diff, setDiff] = useState("all");

  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const activeRef = useRef<HTMLDivElement>(null);

  const updateQsAttend = async (qsId: string) => {
    axios
      .post(`/api/qsattend/mark-unmark`, {
        qs: qsId,
      })
      .then((res) => {
        toast.success(res.data.message);
        getQsAttendsData();
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || err.response.message);
      });
  };

  const getQsAttendsData = () => {
    axios
      .get("/api/qsattend/get")
      .then((res) => {
        setQsAttends(res.data.qsAttends);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || err.response.message);
      });
  };

  useEffect(() => {
    getQsAttendsData();
  }, []);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [page]);

  useEffect(() => {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      role: role,
      diff: diff,
    });

    const url = `/api/questions/get?${searchParams.toString()}`;
    axios
      .get(url)
      .then((res) => {
        setQuestions(res.data.questions);
        setPages(res.data.pages);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || err.response.message);
      });
  }, [page, role, diff]);
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
      </nav>

      <div className="max-w-4xl m-auto">
        <div
          id="top"
          className="flex justify-end gap-4 p-2 border-b border-[#343449] flex-col"
        >
          <div
            className="flex flex-col"
            style={{ fontFamily: "'Roboto mono',monospace" }}
          >
            <h1
              style={{
                letterSpacing: "2px",
              }}
              className="font-extrabold text-[#a2a0ec]"
            >
              QUESTION BANK
            </h1>
            <h1 className="text-xl md:text-3xl font-semibold">
              <span>{questions?.length} questions.</span>
              <br />
              <span className="text-[#726edf]">Practice until it clicks.</span>
            </h1>
            <p className="text-xs text-gray-500">
              Browse by role, filter by difficulty, expand any question to see
              what you shld cover.
            </p>
          </div>

          <div id="roles" className="flex flex-wrap gap-2">
            {roleItems.map((item) => (
              <div
                key={item.value}
                onClick={() => setRole(item.value)}
                className={`px-3 text-sm md:text-lg rounded-2xl cursor-pointer bg-gray-700 text-gray-400 border-gray-500 ${role == item.value && "border"}`}
                style={{
                  backgroundColor: role == item.value ? item.bg : "",
                  borderColor: role == item.value ? item.border : "",
                  color: role == item.value ? item.color : "",
                }}
              >
                {item.label}
              </div>
            ))}
          </div>

          <div id="difficultys" className="flex flex-wrap gap-2">
            {difficultyItems.map((item) => (
              <div
                key={item.value}
                onClick={() => setDiff(item.value)}
                className={`px-3 text-sm md:text-lg  rounded-2xl cursor-pointer bg-gray-700 text-gray-400 border-gray-500 ${diff == item.value && "border"}`}
                style={{
                  backgroundColor: diff == item.value ? item.bg : "",
                  borderColor: diff == item.value ? item.border : "",
                  color: diff == item.value ? item.color : "",
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div id="questions" className="mt-2 gap-4 flex flex-col p-1">
          {questions && questions.length > 0 ? (
            questions.map((qs) => (
              <div
                key={qs._id.toString()}
                className="flex gap-1 text-sm pb-4 border rounded-lg p-3 bg-white/6 border-white/40 cursor-pointer hover:bg-[#464666] hover:scale-[1.01] transition-all duration-200"
              >
                <input
                  type="checkbox"
                  checked={qsAttends?.includes(String(qs._id)) || false}
                  onChange={() => {
                    updateQsAttend(String(qs._id));
                  }}
                />
                <p>{qs.text}</p>
              </div>
            ))
          ) : (
            <span className="text-center">
              Don't have question's for selected filter!!!
            </span>
          )}
        </div>

        <div
          id="pagenation"
          className="flex justify-center pag-2 p-1 sticky bottom-0 bg-black/70 backdrop-blur"
        >
          <Button
            disabled={page == 1}
            className="cursor-pointer"
            onClick={() => setPage(Number(page) - 1)}
          >
            prev
          </Button>
          <div className={`overflow-auto flex gap-1`}>
            {Array.from({ length: pages }, (_, idx) => (
              <div
                key={idx}
                ref={idx + 1 == page ? activeRef : null}
                onClick={() => setPage(idx + 1)}
                className={`border px-3 py-1 rounded-lg read-only cursor-pointer hover:bg-[#6d6bb6] hover:text-white ${idx + 1 == page ? "bg-[#6864F1] " : "border-gray-500 text-gray-500"}`}
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
            next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
