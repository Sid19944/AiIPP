import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface QuestionsIt extends Document {
  text: string;
  role: string;
  difficulty: string;
  topic: string;
  idealAnswer: string;
  tips: string[];
}

const QuestionsSchema: Schema<QuestionsIt> = new Schema(
  {
    text: String,
    role: String,
    difficulty: String,
    topic: String,
    idealAnswer: String,
    tips: [String],
  },
  { timestamps: true },
);

export const QuestionsModel =
  (mongoose.models.Questions as mongoose.Model<QuestionsIt>) ||
  mongoose.model<QuestionsIt>("Questions", QuestionsSchema);
