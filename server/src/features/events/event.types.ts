export type EventStatus = 'live' | 'upcoming' | 'closed';

export interface AfterEvent {
  id: number;
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  distance: string;
  latitude: number;
  longitude: number;
  image: string;
  status: EventStatus;
  attendees: number;
  capacity: number;
}

export interface EventStats {
  peopleNow: number;
  activeEvents: number;
  eventsToday: number;
  capacityPercent: number;
}
