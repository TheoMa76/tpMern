import { Router } from 'express';
import { answerQuestion } from '../controllers/answer.controller';

const router = Router();

router.post('/', answerQuestion);

export default router;
