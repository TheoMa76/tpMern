import { Router } from 'express';
import { getAllQuestions, getQuestionById, randomQuestion } from '../controllers/question.controller';

const router = Router();

router.get('/', getAllQuestions);
router.get('/random', randomQuestion);
router.get('/id', getQuestionById);

export default router;
