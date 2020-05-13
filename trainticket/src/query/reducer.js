// import { combineReducers } from 'redux';
// export default {};
import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_HIGH_SPEED,
  ACTION_SET_TRAIN_LIST,
  ACTION_SET_ORDER_TYPE,
  ACTION_SET_ONLY_TICKETS,
  ACTION_SET_TICKET_TYPES,
  ACTION_SET_CHECKED_TICKET_TYPES,
  ACTION_SET_TRAIN_TYPES,
  ACTION_SET_CHECKED_TRAIN_TYPES,
  ACTION_SET_DEPART_STATIONS,
  ACTION_SET_CHECKED_DEPART_STATIONS,
  ACTION_SET_ARRIVE_STATIONS,
  ACTION_SET_CHECKED_ARRIVE_STATIONS,
  ACTION_SET_DEPART_TIME_START,
  ACTION_SET_DEPART_TIME_END,
  ACTION_SET_ARRIVE_TIME_START,
  ACTION_SET_ARRIVE_TIME_END,
  ACTION_SET_IS_FILTERS_VISIBLE,
  ACTION_SET_SEARCH_PARSED,
} from './actions';
const initialState = {

}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case ACTION_SET_FROM:
      return { ...state, from: payload }
    case ACTION_SET_TO:
      return { ...state, to: payload }
    case ACTION_SET_DEPART_DATE:
      return { ...state, departDate: payload }
    case ACTION_SET_HIGH_SPEED:
      console.log('state', state)
      const newCheckedTrainTypes = state.checkedTrainTypes;
      // let newisFiltersVisible = state.isFiltersVisible;
      // console.log('newisFiltersVisible', newisFiltersVisible)
      if (payload) {
        // newisFiltersVisible = true;
        newCheckedTrainTypes[1] = true;
        newCheckedTrainTypes[5] = true;
      } else {
        // newisFiltersVisible = false;
        delete newCheckedTrainTypes[1]
        delete newCheckedTrainTypes[5]
      }
      // console.log('payload', payload)
      // , isFiltersVisible: newisFiltersVisible 这里没有实现联动
      return { ...state, highSpeed: payload, checkedTrainTypes: newCheckedTrainTypes }
    // ============================================================列表
    case ACTION_SET_TRAIN_LIST:
      return { ...state, trainList: payload }
    case ACTION_SET_ORDER_TYPE:
      return { ...state, orderType: payload }
    // ============================================================票
    case ACTION_SET_ONLY_TICKETS:
      return { ...state, onlyTickets: payload }
    case ACTION_SET_TICKET_TYPES:
      return { ...state, ticketTypes: payload }
    case ACTION_SET_CHECKED_TICKET_TYPES:
      return { ...state, checkedTicketTypes: payload }
    // ============================================================车次
    case ACTION_SET_TRAIN_TYPES:
      return { ...state, trainTypes: payload }
    case ACTION_SET_CHECKED_TRAIN_TYPES:
      console.log('payload', payload);
      const checkedTrainTypes = payload;
      let newHighSpeed = state.highSpeed;
      if (Boolean(checkedTrainTypes[1] && checkedTrainTypes[5])) {
        newHighSpeed = true;
      }
      return { ...state, checkedTrainTypes: payload, highSpeed: newHighSpeed }
    case ACTION_SET_DEPART_STATIONS:
      return { ...state, departStations: payload }
    case ACTION_SET_CHECKED_DEPART_STATIONS:
      return { ...state, checkedDepartStations: payload }
    case ACTION_SET_ARRIVE_STATIONS:
      return { ...state, arriveStations: payload }
    case ACTION_SET_CHECKED_ARRIVE_STATIONS:
      return { ...state, checkedArriveStations: payload }
    // ============================================================时刻
    case ACTION_SET_DEPART_TIME_START:
      return { ...state, departTimeStart: payload }
    case ACTION_SET_DEPART_TIME_END:
      return { ...state, departTimeEnd: payload }
    case ACTION_SET_ARRIVE_TIME_START:
      return { ...state, arriveTimeStart: payload }
    case ACTION_SET_ARRIVE_TIME_END:
      return { ...state, arriveTimeEnd: payload }
    // ============================================================浮层
    case ACTION_SET_IS_FILTERS_VISIBLE:
      return { ...state, isFiltersVisible: payload }
    // ============================================================解析标识
    case ACTION_SET_SEARCH_PARSED:
      return { ...state, searchParsed: payload }

    default:
      return state
  }
}
