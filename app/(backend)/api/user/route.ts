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


/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user with name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securePassword123"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 newUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: john@example.com
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
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
