import dbConnect from "@/lib/dbConnect";
import { WrapAsync } from "@/utils/WrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ErrorHandler from "@/utils/ErrorHandler";
import { SessionModel } from "@/models/session.model";

export const GET = WrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authorized", 400);
  }

  const sessions = await SessionModel.find({
    user: user._id,
    isCompleted: true,
  })
    .sort({
      createdAt: -1,
    })
    .limit(10);

  return NextResponse.json({ success: true, sessions }, { status: 200 });
});
