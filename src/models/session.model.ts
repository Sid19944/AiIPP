import mongoose, { Document, ObjectId, Schema } from "mongoose";

interface SessionIt extends Document {
  id: string | ObjectId;
  user: string | ObjectId;
  role: string;
  difficulty: string;
  totalScore: number;
  isCompleted: boolean;
  totalQuestions: number;
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
      enum: ["frontend", "backend", "fullstack", "dsa", "system-design"],
      required: [true, "Enter Role"],
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: [true, "Enter difficulty level"],
    },
    totalScore: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      default: 0,
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
