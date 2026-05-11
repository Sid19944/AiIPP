import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import ErrorHandler from "@/utils/ErrorHandler";
import { WrapAsync } from "@/utils/WrapAsync";
import { NextRequest, NextResponse } from "next/server";

export const PUT = WrapAsync(async (req: NextRequest) => {
  await dbConnect();
  const { verifyCode, email } = await req.json();
  if (!verifyCode) {
    throw new ErrorHandler("Enter verify code and email both", 400);
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ErrorHandler("Invalid user id", 400);
  }

  if (user.verifyCode !== verifyCode) {
    throw new ErrorHandler("Invalid Verification Code", 400);
  }

  user.isVerified = true;
  await user.save();

  return NextResponse.json(
    {
      success: true,
      message: "Verification Successfully",
    },
    { status: 201 },
  );
});
