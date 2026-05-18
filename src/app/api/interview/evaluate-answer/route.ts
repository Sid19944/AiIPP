import { AnswerModel } from "@/models/answer.model";
import { WrapAsync } from "@/utils/WrapAsync";
import { groq } from "@ai-sdk/groq";
import { generateText, streamText } from "ai";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ErrorHandler from "@/utils/ErrorHandler";
import dbConnect from "@/lib/dbConnect";
import { QuestionsModel } from "@/models/question.model";

const EVALUATE_SYSTEM_PROMPT = `You are an expert technical interviewer evaluating a candidate's answer. Analyze the answer and return ONLY a JSON object with this exact structure — no markdown, no extra text: {"score": 75, "accuracy": 80, "depth": 65, "clarity": 85, "good": ["Point 1", "Point 2"], "missing": ["Missing point 1", "Missing point 2"],  "tips": ["Tip 1", "Tip 2", "Tip 3"], "feedback", "idealAnswer"}`;

export const POST = WrapAsync(async (req: NextRequest) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Autorized", 400);
  }

  const { currSession, question, userAnswer, role, difficulty } =
    await req.json();

  if (!currSession) {
    throw new ErrorHandler("Start new Session ", 400);
  }

  if (!question || !userAnswer || !role || !difficulty) {
    throw new ErrorHandler("Required data is missing", 400);
  }

  const result = await generateText({
    model: groq("llama-3.1-8b-instant"),
    system: EVALUATE_SYSTEM_PROMPT,
    prompt: `Question: ${question}\nAnswer: ${userAnswer}\nRole: ${role}\n Difficulty : ${difficulty}. Evaluate and return JSON only`,
  }); // Parse JSON from AI response
  const clean = result.text.replace(/```json|```/g, "").trim();
  const feedback = JSON.parse(clean); // Save to database await AnswerModel.create({ session, question, userAnswer, ...feedback });

  await QuestionsModel.create({
    text: question,
    role,
    difficulty,
    topic: "General",
    idealAnswer: feedback.idealAnswer,
    tips: feedback.tips,
  });

  await AnswerModel.create({
    session: currSession,
    user: user._id,
    question,
    userAnswer,
    score: feedback.score,
    accuracy: feedback.accuracy,
    depth: feedback.depth,
    idealAnswer: feedback.idealAnswer,
    clarity: feedback.clarity,
    tips: feedback.tips,
    feedback: feedback.feedback,
  });

  return NextResponse.json({ success: true, feedback }, { status: 200 });
});
