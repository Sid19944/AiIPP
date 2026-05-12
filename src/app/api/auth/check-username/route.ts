import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { userNameSchema } from "@/schemas/sign-up.schema";
import ErrorHandler from "@/utils/ErrorHandler";
import { WrapAsync } from "@/utils/WrapAsync";
import { NextRequest, NextResponse } from "next/server";

export const POST = WrapAsync(async (req: NextRequest) => {
  await dbConnect();
  const { username } = await req.json();

  const checkUsernameSchema = userNameSchema.safeParse(username);
  if (!checkUsernameSchema.success) {
    const formatted = checkUsernameSchema.error.format();
    const usernameErr = formatted._errors[0];

    throw new ErrorHandler(`${usernameErr ?? "Invalid input"}`, 400);
  }

  const findUser = await UserModel.findOne({ username });
  if (findUser?.isVerified) {
    throw new ErrorHandler("Username already exist", 400);
  } else {
    return NextResponse.json(
      { success: true, message: "Username available" },
      { status: 200 },
    );
  }
});
