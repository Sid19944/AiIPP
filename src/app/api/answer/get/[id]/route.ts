import dbConnect from "@/lib/dbConnect";
import { AnswerModel } from "@/models/answer.model";
import ErrorHandler from "@/utils/ErrorHandler";
import { WrapAsync } from "@/utils/WrapAsync";
import { NextRequest, NextResponse } from "next/server";

export const GET = WrapAsync(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    await dbConnect();

    const { id } = await params;
    const answer = await AnswerModel.findById(id);
    if (!answer) {
      throw new ErrorHandler("Invalid answer ID", 400);
    }

    return NextResponse.json({ success: true, answer }, { status: 201 });
  },
);
