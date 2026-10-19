import { getProfileRepository } from './profile.repository';
import { Profile } from './profile.types';

export const getProfileService = (): Profile => {
  return getProfileRepository();
};
