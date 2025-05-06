import express from 'express';
import questionRoutes from './routes/question.routes';
import answerRoutes from './routes/answer.routes';

const app = express();

app.use(express.json());
app.use('/questions',questionRoutes);
app.use('/answers', answerRoutes);

export default app;
