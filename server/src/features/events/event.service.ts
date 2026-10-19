import Boom from '@hapi/boom';
import { getEventsRepository, getEventByIdRepository } from './event.repository';
import { AfterEvent, EventStats } from './event.types';

export const getEventsService = (): AfterEvent[] => {
  return getEventsRepository();
};

export const getEventByIdService = (id: number): AfterEvent => {
  const event = getEventByIdRepository(id);

  if (!event) {
    throw Boom.notFound('Event not found');
  }

  return event;
};

// Números de la pantalla Overview, calculados con los eventos que estan en vivo
export const getEventStatsService = (): EventStats => {
  const events = getEventsRepository();
  const liveEvents = events.filter((event) => event.status === 'live');

  const peopleNow = liveEvents.reduce((total, event) => total + event.attendees, 0);
  const totalCapacity = liveEvents.reduce((total, event) => total + event.capacity, 0);
  const capacityPercent = totalCapacity === 0 ? 0 : Math.round((peopleNow / totalCapacity) * 100);

  return {
    peopleNow,
    activeEvents: liveEvents.length,
    eventsToday: events.length,
    capacityPercent,
  };
};
