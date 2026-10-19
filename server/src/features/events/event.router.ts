import { Router } from 'express';
import { getEventsController, getEventStatsController, getEventByIdController } from './event.controller';

export const router = Router();

router.get('/', getEventsController);
router.get('/stats', getEventStatsController);
router.get('/:id', getEventByIdController);
