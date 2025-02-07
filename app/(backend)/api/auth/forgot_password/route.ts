import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import models from "@/models";
import { generateRandomToken } from "@/utils/token";
import { sendEmail } from "@/utils/email";

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
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { error: "Email  are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      NextResponse.json({ error: "User not found" }, { status: 404 });
      return;
    }

    const token = generateRandomToken();
    user.passwordResetToken = token;
    user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();
    const resetUrl = `${process.env.BASE_URL}/reset-password?token=${token}`;
    await sendEmail({
      to: email,
      subject: "Password Reset",
      text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`,
    });
    return NextResponse.json(
      { message: "Password reset link sent" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};
