import dbConnect from "@/lib/dbConnect";
import { QuestionsModel } from "@/models/question.model";
import { WrapAsync } from "@/utils/WrapAsync";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession, User } from "next-auth";
import ErrorHandler from "@/utils/ErrorHandler";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

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

    const limit = 15;
    const skip = (pageNo - 1) * limit;

    const [questions, total] = await Promise.all([
      QuestionsModel.find().limit(limit).skip(skip),
      QuestionsModel.countDocuments(),
    ]);

    const pages = Math.ceil(total / limit);

    return NextResponse.json(
      { success: true, questions, pages },
      { status: 200 },
    );
  },
);
