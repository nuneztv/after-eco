import { Router } from 'express';
import { getActivityController } from './activity.controller';

export const router = Router();

router.get('/', getActivityController);
