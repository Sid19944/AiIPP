import dbConnect from "@/lib/dbConnect";
import { SessionModel } from "@/models/session.model";
import ErrorHandler from "@/utils/ErrorHandler";
import { WrapAsync } from "@/utils/WrapAsync";
import { NextRequest, NextResponse } from "next/server";

export const GET = WrapAsync(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    await dbConnect();

    const { id } = await params;
    const session = await SessionModel.findById(id);

    if (!session) {
      throw new ErrorHandler("Invalid Session ID", 400);
    }

    if (!session.isCompleted) {
      throw new ErrorHandler("Session Is not Completed yet.", 400);
    }

    return NextResponse.json({ success: true, session }, { status: 201 });
  },
);
