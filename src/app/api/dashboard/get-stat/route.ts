import dbConnect from "@/lib/dbConnect";
import { WrapAsync } from "@/utils/WrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { SessionModel } from "@/models/session.model";
import mongoose from "mongoose";
import ErrorHandler from "@/utils/ErrorHandler";

export interface StatsIt {
  totalSession: number;
  avgScore: number;
  answeredQs: number;
  allScores: number[];
  allRoles: string[];
  recentScore: number;
  oldest: number;
  readiness: number;
  bestScore: number;
}

export const GET = WrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authorized", 400);
  }

  const sessions = await SessionModel.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(user._id as string),
        isCompleted: true,
      },
    },
    { $sort: { completedAt: -1 } },

    {
      $group: {
        _id: null,
        totalSession: { $sum: 1 },
        avgScore: { $avg: "$avgScore" },
        answeredQs: { $sum: "$answeredQs" },
        allScores: { $push: "$avgScore" },
        allRoles: { $addToSet: "$role" },
        recentScore: { $first: "$avgScore" },
        oldest: { $last: "$avgScore" },
        bestScore: { $max: "$avgScore" },
      },
    },
  ]);

  const data = sessions[0];

  if (data) {
    const scoreFactor = Math.min(100, data.avgScore);
    const consistencyFactor = Math.min(
      100,
      Math.max(0, 50 + (data.recentScore - data.oldest) * 2),
    );
    const trendFactor = Math.min(
      100,
      Math.max(0, 50 + (data.recentScore - data.oldest) * 1.5),
    );
    const coverageFactor = (data.allRoles.length / 5) * 100;
    const attemptsFactor = Math.min(100, (data.totalSession / 20) * 100);

    data.readiness = Math.round(
      scoreFactor * 0.4 +
        consistencyFactor * 0.2 +
        trendFactor * 0.2 +
        coverageFactor * 0.1 +
        attemptsFactor * 0.1,
    );
  }

  return NextResponse.json({ success: true, data }, { status: 200 });
});
