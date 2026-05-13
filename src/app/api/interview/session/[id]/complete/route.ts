import dbConnect from "@/lib/dbConnect";
import { AnswerModel } from "@/models/answer.model";
import { SessionModel } from "@/models/session.model";
import ErrorHandler from "@/utils/ErrorHandler";
import { WrapAsync } from "@/utils/WrapAsync";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface DataIt {
  totalScore: number;
  totalQuestios: number;
}

export const PUT = WrapAsync(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    await dbConnect();

    const { id } = await params;

    const findSession = await SessionModel.findById(id);
    if (!findSession) {
      throw new ErrorHandler("Invalid session ID", 400);
    }

    if (findSession.isCompleted) {
      throw new ErrorHandler("Session is already completed", 400);
    }

    const data: DataIt[] = await AnswerModel.aggregate([
      { $match: { session: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: "$session",
          totalScore: { $avg: "$score" },
          totalQuestions: { $sum: 1 },
        },
      },
      {
        $project: {
          totalScore: 1,
          totalQuestions: 1,
        },
      },
    ]);

    findSession.totalScore = data[0].totalScore;
    findSession.totalQuestions = data[0].totalQuestios;
    findSession.completedAt = new Date(Date.now());
    findSession.isCompleted = true;
    await findSession.save();

    return NextResponse.json(
      { success: true, message: `Session Completed.` },
      { status: 201 },
    );
  },
);
