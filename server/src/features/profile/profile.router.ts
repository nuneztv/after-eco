import { Router } from 'express';
import { getProfileController } from './profile.controller';

export const router = Router();

router.get('/', getProfileController);
