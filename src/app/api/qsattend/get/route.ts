import dbConnect from "@/lib/dbConnect";
import { WrapAsync } from "@/utils/WrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ErrorHandler from "@/utils/ErrorHandler";
import { QsAttendModel } from "@/models/qsAttend.model";

export const GET = WrapAsync(async (req: NextRequest) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authenticated", 401);
  }

  const qsAttends = await QsAttendModel.findOne({user : user._id});
  return NextResponse.json({ success: true, qsAttends: qsAttends?.qsAttends });
});
