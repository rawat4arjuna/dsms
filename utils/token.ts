import crypto from "crypto";

export const generateRandomToken = (): string => {
  return crypto.randomBytes(20).toString("hex");
};
