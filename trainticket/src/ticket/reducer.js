// import { combineReducers } from 'redux';
// export default {};
// export default function () { };

import {
  ACTION_SET_ARRIVE_DATE,
  ACTION_SET_ARRIVE_STATION,
  ACTION_SET_ARRIVE_TIME_STR,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_DEPART_STATION,
  ACTION_SET_DEPART_TIME_STR,
  ACTION_SET_DURATION_STR,
  ACTION_SET_IS_SCHEDULE_VISIBLE,
  ACTION_SET_SEARCH_PARSED,
  ACTION_SET_TICKETS,
  ACTION_SET_TRAIN_NUMBER
} from './actions'

const initialState = {

}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_SET_ARRIVE_DATE:
      return { ...state, arriveDate: payload }
    case ACTION_SET_ARRIVE_STATION:
      return { ...state, arriveStation: payload }
    case ACTION_SET_ARRIVE_TIME_STR:
      return { ...state, arriveTimeStr: payload }
    case ACTION_SET_DEPART_DATE:
      return { ...state, departDate: payload }
    case ACTION_SET_DEPART_STATION:
      return { ...state, departStation: payload }
    case ACTION_SET_DEPART_TIME_STR:
      return { ...state, departTimeStr: payload }
    case ACTION_SET_DURATION_STR:
      return { ...state, durationStr: payload }
    case ACTION_SET_IS_SCHEDULE_VISIBLE:
      return { ...state, isScheduleVisible: payload }
    case ACTION_SET_SEARCH_PARSED:
      return { ...state, searchParsed: payload }
    case ACTION_SET_TICKETS:
      return { ...state, tickets: payload }
    case ACTION_SET_TRAIN_NUMBER:
      return { ...state, trainNumber: payload }
    default:
      return state
  }
}
