import { profile } from './data.mock';
import { Profile } from './profile.types';

export const getProfileRepository = (): Profile => {
  return profile;
};
