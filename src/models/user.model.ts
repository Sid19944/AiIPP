import mongoose, { Schema, Document, ObjectId } from "mongoose";
export interface UserIt extends Document {
  id: string | ObjectId;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: number;
  verifyCodeExpiry: Date;
  createdAt: Date;
}

const UserSchema: Schema<UserIt> = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: Number,
      min: 100000,
      max: 999999,
    },
    verifyCodeExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const UserModel =
  (mongoose.models.User as mongoose.Model<UserIt>) ||
  mongoose.model<UserIt>("User", UserSchema);
