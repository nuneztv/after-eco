import express from 'express';
import cors from 'cors';
import { NODE_ENV, PORT } from './config';
import { errorsMiddleware } from './middlewares/errorsMiddleware';
import { router as eventsRouter } from './features/events/event.router';
import { router as activityRouter } from './features/activity/activity.router';
import { router as profileRouter } from './features/profile/profile.router';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('After API funcionando');
});

// Routes
app.use('/api/events', eventsRouter);
app.use('/api/activity', activityRouter);
app.use('/api/profile', profileRouter);

// Error handling middleware
app.use(errorsMiddleware);

// En Vercel (production) no se usa listen, solo se exporta la app
if (NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
  });
}

export default app;
