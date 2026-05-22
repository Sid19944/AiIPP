import dbConnect from "@/lib/dbConnect";
import { AnswerModel } from "@/models/answer.model";
import { SessionModel } from "@/models/session.model";
import ErrorHandler from "@/utils/ErrorHandler";
import { WrapAsync } from "@/utils/WrapAsync";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface DataIt {
  avgScore: number;
  avgAccuracy: number;
  avgDepth: number;
  avgClarity: number;
  answeredQs: number;
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
          avgScore: { $avg: "$score" },
          avgAccuracy: { $avg: "$accuracy" },
          avgDepth: { $avg: "$depth" },
          avgClarity: { $avg: "$clarity" },
          answeredQs: { $sum: 1 },
        },
      },
      {
        $project: {
          avgScore: 1,
          avgAccuracy: 1,
          avgDepth: 1,
          avgClarity: 1,
          answeredQs: 1,
        },
      },
    ]);

    const scores = data[0] || { avgScore: 0, answeredQs: 0 };

    findSession.avgScore = scores.avgScore || 0;
    findSession.answeredQs = scores.answeredQs || 0;
    findSession.completedAt = new Date();
    findSession.isCompleted = true;
    await findSession.save();

    return NextResponse.json(
      { success: true, result: findSession },
      { status: 201 },
    );
  },
);
