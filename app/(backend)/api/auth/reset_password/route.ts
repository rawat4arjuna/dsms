import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import models from "@/models";
import { Op } from "sequelize";
const { User } = models;
interface ExtendedNextApiRequest extends NextApiRequest {
  json(): any;
  body: {
    email: string;
    password: string;
  };
}
export const POST = async (req: ExtendedNextApiRequest) => {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 404 }
      );
    }
    user.password = newPassword;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};
