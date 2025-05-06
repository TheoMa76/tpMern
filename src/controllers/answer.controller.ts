import { Request, Response } from 'express';
import Question from '../models/question.model';
import Answer from '../models/answer.model';
import mongoose from 'mongoose';

export const answerQuestion = async (req: Request, res: Response)=> {
    try {
        const { questionId, userAnswer } = req.body;
        const question = await Question.findById(questionId);
        if (!question) {
            res.status(404).json({ message: 'Question non trouvée.' });
            return;        }
            console.log(question.answer)
        if (question.answer == userAnswer) {
            const answer = new Answer({
                _id: new mongoose.Types.ObjectId(),
                userResponse: userAnswer,
                questionId: questionId,
                isCorrect: true
            });
            await answer.save();
            res.status(200).json({ message: 'Réponse correcte !' });
            return;
        } else {
            const answer = new Answer({
                _id: new mongoose.Types.ObjectId(),
                userResponse: userAnswer,
                questionId: questionId,
                isCorrect: false
            });
            await answer.save();
            res.status(200).json({ message: 'Réponse incorrecte !' });
            return;
        }
    } catch (error) {
        console.error(req.body);
        console.error(req);
        res.status(400).json({ message: 'Erreur pour l\'envoie de la réponse. '+error });
    }
};
