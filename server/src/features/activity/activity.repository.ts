import { activities } from './data.mock';
import { Activity } from './activity.types';

export const getActivityRepository = (): Activity[] => {
  return activities;
};
