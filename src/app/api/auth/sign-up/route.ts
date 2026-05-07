import { WrapAsync } from "@/utils/WrapAsync";
import { NextRequest, NextResponse } from "next/server";
import ErrorHandler from "@/utils/ErrorHandler";
import { UserModel } from "@/models/user.model";
import { signUpSchema } from "@/schemas/sign-up.schema";
import bcrypt from "bcryptjs";
import { SendVerificationEmail } from "@/utils/SendVerifyEmail";
import dbConnect from "@/lib/dbConnect";

export const POST = WrapAsync(async (req: NextRequest) => {
  await dbConnect();
  const body = await req.json();
  const { username, email, password } = body;
  if (!username || !email || !password) {
    throw new ErrorHandler("Provide all detail", 400);
  }
  const userExist = await UserModel.findOne({ email });

  // zod validation
  const checkSignUpSchema = signUpSchema.safeParse(body);

  if (!checkSignUpSchema.success) {
    const formatted = checkSignUpSchema.error.format();
    const usernameErr = formatted.username?._errors[0];
    const emialErr = formatted.email?._errors[0];
    const passwordErr = formatted.password?._errors[0];

    throw new ErrorHandler(
      `${usernameErr ?? emialErr ?? passwordErr ?? "Invalid input"}`,
      400,
    );
  }

  const verifyCode = Math.floor(100000 + Math.random() * 900000);
  const verifyCodeExpiry = new Date(Date.now() + 5 * 60 * 1000);
  const hashPassword = await bcrypt.hash(password, 10);

  if (userExist) {
    if (userExist.isVerified) {
      throw new ErrorHandler("User already registered with email id", 400);
    } else {
      userExist.username = username;
      userExist.password = hashPassword;
      userExist.verifyCode = verifyCode;
      userExist.verifyCodeExpiry = verifyCodeExpiry;
      await userExist.save();
    }
  } else {
    const user = await UserModel.create({
      username,
      email,
      verifyCode,
      verifyCodeExpiry,
      password: hashPassword,
    });

    if (!user) {
      throw new ErrorHandler("Something went wrong, try again", 500);
    }
  }

  const emailResponse = await SendVerificationEmail(
    email,
    username,
    verifyCode,
  );

  if (!emailResponse.success) {
    throw new ErrorHandler(emailResponse.message, 500);
  }

  return NextResponse.json(
    {
      success: true,
      message: "User Registred Successfully, please verify email",
    },
    { status: 201 },
  );
});
