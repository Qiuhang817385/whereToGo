// import { combineReducers } from 'redux';
// export default {};
// export default function () { };
import {
  ACTION_SET_TRAIN_NUMBER,
  ACTION_SET_DEPART_STATION,
  ACTION_SET_ARRIVE_STATION,
  ACTION_SET_SEAT_TYPE,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_ARRIVE_DATE,
  ACTION_SET_DEPART_TIME_STR,
  ACTION_SET_ARRIVE_TIME_STR,
  ACTION_SET_DURATION_STR,
  ACTION_SET_PRICE,
  ACTION_SET_PASSENGERS,
  ACTION_SET_MENU,
  ACTION_SET_IS_MENU_VISIBLE,
  ACTION_SET_SEARCH_PARSED,
} from './actions'

const initialState = {

}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_SET_TRAIN_NUMBER:
      return { ...state, trainNumber: payload }
    case ACTION_SET_DEPART_STATION:
      return { ...state, departStation: payload }
    case ACTION_SET_ARRIVE_STATION:
      return { ...state, arriveStation: payload }
    case ACTION_SET_SEAT_TYPE:
      return { ...state, seatType: payload }
    case ACTION_SET_DEPART_DATE:
      return { ...state, departDate: payload }
    case ACTION_SET_ARRIVE_DATE:
      return { ...state, arriveDate: payload }
    case ACTION_SET_DEPART_TIME_STR:
      return { ...state, departTimeStr: payload }
    case ACTION_SET_ARRIVE_TIME_STR:
      return { ...state, arriveTimeStr: payload }
    case ACTION_SET_DURATION_STR:
      return { ...state, durationStr: payload }
    case ACTION_SET_PRICE:
      return { ...state, price: payload }
    case ACTION_SET_PASSENGERS:
      return { ...state, passengers: payload }
    case ACTION_SET_MENU:
      return { ...state, menu: payload }
    case ACTION_SET_IS_MENU_VISIBLE:
      return { ...state, isMenuVisible: payload }
    case ACTION_SET_SEARCH_PARSED:
      return { ...state, searchParsed: payload }

    default:
      return state
  }
}
