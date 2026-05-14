import dbConnect from "@/lib/dbConnect";
import { AnswerModel } from "@/models/answer.model";
import { SessionModel } from "@/models/session.model";
import ErrorHandler from "@/utils/ErrorHandler";
import { WrapAsync } from "@/utils/WrapAsync";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface DataIt {
  totalScore: number;
  totalQuestions: number;
}

export const PUT = WrapAsync(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
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
          _id: null,
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

    const scores = data[0] || { totalScore: 0, totalQuestions: 0 };

    findSession.totalScore = scores.totalScore || 0;
    findSession.totalQuestions = scores.totalQuestions || 0;
    findSession.completedAt = new Date();
    findSession.isCompleted = true;
    await findSession.save();

    return NextResponse.json(
      { success: true, message: `Session Completed.` },
      { status: 201 },
    );
  },
);
