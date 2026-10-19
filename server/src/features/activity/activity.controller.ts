import { Request, Response } from 'express';
import Boom from '@hapi/boom';
import { getActivityService } from './activity.service';

export const getActivityController = (req: Request, res: Response) => {
  const { eventId } = req.query;

  if (eventId === undefined) {
    return res.json(getActivityService());
  }

  const id = Number(eventId);

  if (Number.isNaN(id)) {
    throw Boom.badRequest('eventId must be a number');
  }

  return res.json(getActivityService(id));
};
