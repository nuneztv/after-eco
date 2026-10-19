import { Request, Response } from 'express';
import Boom from '@hapi/boom';
import { getEventsService, getEventByIdService, getEventStatsService } from './event.service';

export const getEventsController = (_req: Request, res: Response) => {
  const events = getEventsService();
  return res.json(events);
};

export const getEventStatsController = (_req: Request, res: Response) => {
  const stats = getEventStatsService();
  return res.json(stats);
};

export const getEventByIdController = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw Boom.badRequest('Event id must be a number');
  }

  const event = getEventByIdService(id);
  return res.json(event);
};
