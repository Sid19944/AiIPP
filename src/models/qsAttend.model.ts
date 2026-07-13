import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface QsAttendIt extends Document {
  user: string | ObjectId;
  qsAttends: string[];
}

const QsAttendSchme: Schema<QsAttendIt> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  qsAttends: [],
});

export const QsAttendModel =
  (mongoose.models.QsAttend as mongoose.Model<QsAttendIt>) ||
  mongoose.model<QsAttendIt>("QsAttend", QsAttendSchme);
