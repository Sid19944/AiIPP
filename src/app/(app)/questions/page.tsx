"use client";

import { QuestionsIt } from "@/models/question.model";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const roleItems = [
  { label: "All Role", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Fullstack", value: "fullstack" },
  { label: "System-Design", value: "system-design" },
  { label: "DSA", value: "dsa" },
  { label: "Devops", value: "devops" },
];

const difficultyItems = [
  { label: "All Difficulty", value: "all" },
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

function page() {
  const [questions, setQuestions] = useState<QuestionsIt[] | undefined>(
    undefined,
  );

  const [role, setRole] = useState("all");
  const [diff, setDiff] = useState("all");

  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const activeRef = useRef<HTMLDivElement>(null);
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

    const url = `/api/questions/get?${searchParams.toString()}`
    axios
      .get(url)
      .then((res) => {
        setQuestions(res.data.questions);
        setPages(res.data.pages);
      })
      .catch((err) => {
        console.log(err);
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

      <div
        id="filter"
        className="flex justify-end gap-2 p-2 border-b border-[#343449]"
      >
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {roleItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={diff} onValueChange={setDiff}>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {difficultyItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="p-2 md:p-5 gap-3 flex flex-col">
        {questions &&
          questions.map((qs, idx) => (
            <div
              key={qs._id.toString()}
              className="pb-4 border rounded-lg p-3 border-white/40 cursor-pointer hover:bg-[#464666] hover:scale-[1.01] transition-all duration-200"
            >
              {qs.text}
            </div>
          ))}
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
  );
}

export default page;
