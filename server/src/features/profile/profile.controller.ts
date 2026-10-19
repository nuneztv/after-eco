import { Request, Response } from 'express';
import { getProfileService } from './profile.service';

export const getProfileController = (_req: Request, res: Response) => {
  const profile = getProfileService();
  return res.json(profile);
};
