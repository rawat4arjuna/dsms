import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "qvl";

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, secret, {
    expiresIn: "1h", // Token expires in 1 hour
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
