import { getActivityRepository } from './activity.repository';
import { Activity } from './activity.types';

// Si llega eventId devuelve solo la actividad de ese evento
export const getActivityService = (eventId?: number): Activity[] => {
  const activities = getActivityRepository();

  if (eventId === undefined) {
    return activities;
  }

  return activities.filter((activity) => activity.eventId === eventId);
};
