import axios from 'axios';
import {ON_NEW_WEIGHTINGS} from '../actions/types';

var initialState = {};

const weightings = {"obp": 3.0,
                    "slg": 3.0,
                    "soRate": 0.7,
                    "bbRate": 0.4,
                    "sbPct": 0.5,
                    "sb": 0.6,
                    "ba": 0.7,
                    "hrRate": 0.8,
                    "rbi": 0.3 };

initialState.weightings = weightings;

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case ON_NEW_WEIGHTINGS:
      return {weightings: action.weightings};
    default:
      return state;
  }
};

export default rootReducer;
