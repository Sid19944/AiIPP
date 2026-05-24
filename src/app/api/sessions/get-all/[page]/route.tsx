import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { SessionModel } from "@/models/session.model";
import ErrorHandler from "@/utils/ErrorHandler";
import { WrapAsync } from "@/utils/WrapAsync";
import mongoose from "mongoose";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = WrapAsync(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ page: string }> },
  ) => {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
      throw new ErrorHandler("Not Authenticated", 400);
    }

    const { page } = await params;
    const pageNo = parseInt(page, 10);
    if (isNaN(pageNo)) {
      throw new ErrorHandler("Invalid page number, Enter number", 400);
    }

    const limit = 10;
    const skip = (pageNo - 1) * limit;

    const sessions = await SessionModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(user._id as string),
          isCompleted: true,
        },
      },
      {
        $setWindowFields: {
          output: {
            avgScoreOfDocs: { $avg: "$avgScore" },
            avgClarityOfDocs : {$avg : "$avgClarity"},
            totalSession: { $count: {} },
          },
        },
      },
      { $sort: { completedAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    return NextResponse.json({ success: true, sessions }, { status: 200 });
  },
);
