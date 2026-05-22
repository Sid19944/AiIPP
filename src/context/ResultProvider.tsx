"use client";
import { AnswerIt } from "@/models/answer.model";
import { SessionIt } from "@/models/session.model";
import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

interface ResultContext {
  getSession: (id: string) => void;
  session: SessionIt | null;
  getAnswers: (sessionId: string) => void;
  answers: AnswerIt[] | [];
}

const ResultContext = createContext<ResultContext | undefined>(undefined);

export function ResultProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionIt | null>(null);
  const [answers, setAnswers] = useState<AnswerIt[] | []>([]);
  const getSession = (id: string) => {
    axios
      .get(`/api/interview/session/get/${id}`)
      .then((res) => {
        setSession(res.data.session);
      })
      .catch((err) => {
        console.error("Error in get the session", err);
      });
  };

  const getAnswers = (sessionId: string) => {
    axios
      .get(`/api/answer/for-result/${sessionId}`)
      .then((res) => {
        setAnswers(res.data.answers || []);
      })
      .catch((err) => {
        console.error("Error in get the answers", err);
      });
  };
  return (
    <ResultContext.Provider
      value={{ getSession, session, getAnswers, answers }}
    >
      {children}
    </ResultContext.Provider>
  );
}

export function useResult() {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error("useResult must be used insidd ResultProvider");
  }
  return context;
}
