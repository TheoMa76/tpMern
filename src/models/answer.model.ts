import { Schema, model, Document } from 'mongoose';

export interface IAnswer extends Document {
  _id: string;
  userResponse: String;
  isCorrect: boolean;
}

const answerSchema = new Schema<IAnswer>({
  _id: { type: String, required: true },
  userResponse: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});


export default model<IAnswer>('Answer', answerSchema);