import express from 'express';
import healthRouter from './routes/health.js';
import notesRouter from './routes/notes.js';

const app = express();
app.use(express.json());

app.use('/health', healthRouter);
app.use('/notes', notesRouter);

export default app;
