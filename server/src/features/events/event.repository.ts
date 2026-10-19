import { events } from './data.mock';
import { AfterEvent } from './event.types';

export const getEventsRepository = (): AfterEvent[] => {
  return events;
};

export const getEventByIdRepository = (id: number): AfterEvent | undefined => {
  return events.find((event) => event.id === id);
};
