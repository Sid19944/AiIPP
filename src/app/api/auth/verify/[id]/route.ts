import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import ErrorHandler from "@/utils/ErrorHandler";
import { WrapAsync } from "@/utils/WrapAsync";
import { NextRequest, NextResponse } from "next/server";

export const PUT = WrapAsync(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    await dbConnect();

    const {id} = await params;

    console.log(id)
    const { verifyCode } = await req.json();

    if (!verifyCode) {
      throw new ErrorHandler("Enter verify code and email both", 400);
    }

    const user = await UserModel.findById(id);

    return NextResponse.json(
      {
        success: true,
        user
      },
      { status: 201 },
    );
  },
);
