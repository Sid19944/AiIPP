import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { SessionModel } from "@/models/session.model";
import ErrorHandler from "@/utils/ErrorHandler";
import { WrapAsync } from "@/utils/WrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = WrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authenticated", 400);
  }

  const { role, difficulty } = await req.json();

  if (!role || !difficulty) {
    throw new ErrorHandler("Provide Role and Difficulty", 400);
  }

  const createSession = await SessionModel.create({
    user: user._id,
    role,
    difficulty,
  });

  if (!createSession) {
    throw new ErrorHandler("Failed to create Session", 500);
  }

  return NextResponse.json(
    {
      success: true,
      message: "New Session Started",
      sessionId: createSession._id,
    },
    { status: 201 },
  );
});
