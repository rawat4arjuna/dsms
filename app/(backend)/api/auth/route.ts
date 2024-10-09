import { NextResponse } from "next/server";

export const GET = () => {
  const response = NextResponse.json({ msg: "testing done" });
  return response;
};
