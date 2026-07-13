import dbConnect from "@/lib/dbConnect";
import { WrapAsync } from "@/utils/WrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ErrorHandler from "@/utils/ErrorHandler";
import { QsAttendModel } from "@/models/qsAttend.model";

export const POST = WrapAsync(async (req: NextRequest) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authenticated", 401);
  }

  const { qs } = await req.json();

  const exist = await QsAttendModel.findOne({ user: user._id });

  if (!exist) {
    const newEntry = await QsAttendModel.create({
      user: user._id,
      qsAttends: [qs],
    });

    if (!newEntry) {
      throw new ErrorHandler("Faild to mark, try again", 500);
    }
    return NextResponse.json({ success: true, message: "Qs attend" });
  }

  const qsExist = exist.qsAttends.find((q) => q == qs);
  if (!qsExist) {
    exist.qsAttends.push(qs);
    await exist.save();
    return NextResponse.json({ success: true, message: "Qs attend" });
  } else {
    exist.qsAttends = exist.qsAttends.filter((q) => q != qs);
    await exist.save();
    return NextResponse.json({ success: true, message: "Qs un-attend" });
  }
});
