import express from 'express';
import questionRoutes from './routes/question.routes';
import answerRoutes from './routes/answer.routes';


const app = express();
var cors = require('cors');

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };
  
app.use(cors(corsOptions));
app.use('/questions',questionRoutes);
app.use('/answers', answerRoutes);

export default app;


