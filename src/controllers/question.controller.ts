import { Request, Response } from 'express';
import Question from '../models/question.model';

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des questions.' });
  }
};

export const randomQuestion = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find();
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    res.json(randomQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération d\'une question aléatoire.' });
  }
}

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      res.status(404).json({ message: 'Question non trouvée.' });
      return;
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la question.' });
  }
};
