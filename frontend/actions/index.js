// Action Creators

// import * as types from './types';

import { ON_NEW_WEIGHTINGS } from './types';

export function newWeightings(weightings) {
  return {
      type: ON_NEW_WEIGHTINGS,
      weightings: weightings
  };
}
