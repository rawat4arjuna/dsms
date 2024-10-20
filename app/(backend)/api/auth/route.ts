import { sequelize } from "@/models";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  const response = NextResponse.json({ msg: "testing done" });
  return response;
};
