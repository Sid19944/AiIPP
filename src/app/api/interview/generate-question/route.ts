import { groq } from "@ai-sdk/groq";
import { generateText, streamText } from "ai";
import { NextResponse } from "next/server";

// export const runtime = "edge";

export async function POST(req: Request) {
  const { difficulty, role, topic } = await req.json();

  // Call the Groq LPU engine for instant streaming responses
  const result = await generateText({
    model: groq("llama-3.1-8b-instant"),
    system: `You are an expert technical interviewer. Generate a single technical interview question for a ${role} developer at ${difficulty} difficulty level. The question should test real-world knowledge. Return ONLY the question text, nothing else.`,
    prompt: `Generate a ${difficulty} level ${role} interview question about ${topic}.`,
  });

  console.log(result.text);
  return NextResponse.json(result.text);
}
