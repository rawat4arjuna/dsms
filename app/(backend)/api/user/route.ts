// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";

import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

interface ExtendedNextApiRequest extends NextApiRequest {
  json(): any;
  body: {
    name: string;
    email: string;
    password: string;
  };
}
export const POST = async (req: ExtendedNextApiRequest) => {
  await dbConnect();

  try {
    const { name, email, password } = await req.json();
    const user = new User({ name, email, password });
    await user.save();
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
