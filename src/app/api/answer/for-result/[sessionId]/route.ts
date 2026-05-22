import dbConnect from "@/lib/dbConnect";
import { AnswerModel } from "@/models/answer.model";
import ErrorHandler from "@/utils/ErrorHandler";
import { WrapAsync } from "@/utils/WrapAsync";
import { NextRequest, NextResponse } from "next/server";

export const GET = WrapAsync(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ sessionId: string }> },
  ) => {
    await dbConnect();
    const { sessionId } = await params;

    const answers = await AnswerModel.find({ session: sessionId });

    if (!answers.length) {
      throw new ErrorHandler("Invaid SessionID", 400);
    }

    return NextResponse.json({ success: true, answers }, { status: 201 });
  },
);


// aggragate the score seperate for chart