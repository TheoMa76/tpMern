import { Schema, model, Document } from 'mongoose';

export interface IQuestion extends Document {
  _id: string;
  image: string;
  options: string[];
  answer: string;
}

const questionSchema = new Schema<IQuestion>({
  _id: { type: String, required: true },
  image: { type: String, required: true },
  options: { type: [String], required: true, validate: [arrayLimit, '{PATH} doit contenir exactement 5 options'] },
  answer: { type: String, required: true }
});

function arrayLimit(val: string[]) {
  return val.length === 5;
}

export default model<IQuestion>('Question', questionSchema);