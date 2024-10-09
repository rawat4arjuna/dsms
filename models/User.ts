// models/User.ts
import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
