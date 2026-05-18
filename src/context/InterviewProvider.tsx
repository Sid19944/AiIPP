"use client";

import { SessionIt } from "@/models/session.model";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import toast from "react-hot-toast";

interface InterviewContext {
  currSession: string | null;
  startSession: ({
    role,
    difficulty,
  }: {
    role: string | undefined;
    difficulty: string | undefined;
  }) => void;

  endSession: () => void;
}

const InterviewContext = createContext<InterviewContext | undefined>(undefined);

export function InterviewProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [currSession, setCurrSession] = useState<string | null>(null);
  const [result, setResult] = useState<SessionIt | null>(null);

  const endSession = () => {
    axios
      .put(`/api/interview/session/${currSession}/complete`)
      .then((res) => {
        setResult(res.data.result);
        console.log("Result of this Session", res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const startSession = ({
    role,
    difficulty,
  }: {
    role: string | undefined;
    difficulty: string | undefined;
  }) => {
    axios
      .post(`/api/interview/session/start`, { role, difficulty })
      .then((res) => {
        setCurrSession(res.data.sessionId);
      })
      .catch((err) => {
        const axiosErr = err as AxiosError<ApiResponse>;
        toast.error(
          axiosErr?.response?.data.message || "Internal server Error",
        );
        router.replace("/interview/setup");
        return;
      });
  };

  console.log(currSession)

  return (
    <InterviewContext.Provider
      value={{ currSession, startSession, endSession }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  const context = useContext(InterviewContext);
  if (!context)
    throw new Error("useInterview must be used insidd InterviewProvider");
  return context;
}
