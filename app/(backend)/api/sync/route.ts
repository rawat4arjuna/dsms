// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import models, { sequelize } from "@/models";

const { User } = models;
interface ExtendedNextApiRequest extends NextApiRequest {
  json(): any;
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export const GET = async (req: ExtendedNextApiRequest) => {
  sequelize.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    console.log("Database & tables created!");
  });
  NextResponse.json({ msg: "sync done" });
};
