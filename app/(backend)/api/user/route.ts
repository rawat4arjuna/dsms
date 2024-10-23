// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import models from "@/models";

const { User } = models;
interface ExtendedNextApiRequest extends NextApiRequest {
  json(): any;
  body: {
    name: string;
    email: string;
    password: string;
  };
}
export const POST = async (req: ExtendedNextApiRequest) => {
  try {
    const { name, email, password } = await req.json();
    const newUser = await User.create({ name, email, password });

    return NextResponse.json({ success: true, newUser });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const GET = async (req: ExtendedNextApiRequest) => {
  const users = await User.findAll();
  NextResponse.json(users);
};
