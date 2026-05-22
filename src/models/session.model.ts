import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface SessionIt extends Document {
  id: string | ObjectId;
  user: string | ObjectId;
  role: string;
  difficulty: string;
  avgScore: number;
  avgAccuracy: number;
  avgDepth: number;
  avgClarity: number;
  isCompleted: boolean;
  totalQs: number;
  answeredQs: number;
  completedAt: Date;
}

const SessionSchema: Schema<SessionIt> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: [
        "frontend",
        "backend",
        "fullstack",
        "dsa",
        "system-design",
        "devops",
      ],
      required: [true, "Enter Role"],
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: [true, "Enter difficulty level"],
    },
    avgScore: {
      type: Number,
      default: 0,
    },
    avgAccuracy: {
      type: Number,
      default: 0,
    },
    avgDepth: {
      type: Number,
      default: 0,
    },
    avgClarity: {
      type: Number,
      default: 0,
    },
    answeredQs: {
      type: Number,
      default: 0,
    },
    totalQs: {
      type: Number,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const SessionModel =
  (mongoose.models.Session as mongoose.Model<SessionIt>) ||
  mongoose.model<SessionIt>("Session", SessionSchema);
