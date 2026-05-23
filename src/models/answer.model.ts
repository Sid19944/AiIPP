import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface AnswerIt extends Document {
  id: string | ObjectId;
  session: string | ObjectId;
  user: string | ObjectId;
  question: string;
  userAnswer: string;
  score: number;
  accuracy: number;
  depth: number;
  clarity: number;
  feedback: string;
  idealAnswer: string;
  good: string[];
  missing: string[];
  tips: string[];
  createdAt: Date;
}

const AnswerSchema: Schema<AnswerIt> = new Schema({
  session: {
    type: Schema.Types.ObjectId,
    ref: "Session",
    required: [true, "Enter session id"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Enter user id"],
  },
  question: String,
  userAnswer: String,
  score: Number,
  accuracy: Number,
  depth: Number,
  clarity: Number,
  good: [String],
  missing: [String],
  idealAnswer: String,
  tips: [String],
  feedback: String,
});

export const AnswerModel =
  (mongoose.models.Answer as mongoose.Model<AnswerIt>) ||
  mongoose.model<AnswerIt>("Answer", AnswerSchema);
 