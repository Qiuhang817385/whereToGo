import {
  ORDER_DURATION,
  ORDER_DEPART,
} from './constant';

import { h0 } from '../utils/utils';

export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export const ACTION_SET_TRAIN_LIST = 'SET_TRAIN_LIST';
export const ACTION_SET_ORDER_TYPE = 'SET_ORDER_TYPE';
export const ACTION_SET_ONLY_TICKETS = 'SET_ONLY_TICKETS';
export const ACTION_SET_TICKET_TYPES = 'SET_TICKET_TYPES';
export const ACTION_SET_CHECKED_TICKET_TYPES = 'SET_CHECKED_TICKET_TYPES';
export const ACTION_SET_TRAIN_TYPES = 'SET_TRAIN_TYPES';
export const ACTION_SET_CHECKED_TRAIN_TYPES = 'SET_CHECKED_TRAIN_TYPES';
export const ACTION_SET_DEPART_STATIONS = 'SET_DEPART_STATIONS';
export const ACTION_SET_CHECKED_DEPART_STATIONS = 'SET_CHECKED_DEPART_STATIONS';
export const ACTION_SET_ARRIVE_STATIONS = 'SET_ARRIVE_STATIONS';
export const ACTION_SET_CHECKED_ARRIVE_STATIONS = 'SET_CHECKED_ARRIVE_STATIONS';
export const ACTION_SET_DEPART_TIME_START = 'SET_DEPART_TIME_START';
export const ACTION_SET_DEPART_TIME_END = 'SET_DEPART_TIME_END';
export const ACTION_SET_ARRIVE_TIME_START = 'SET_ARRIVE_TIME_START';
export const ACTION_SET_ARRIVE_TIME_END = 'SET_ARRIVE_TIME_END';
export const ACTION_SET_IS_FILTERS_VISIBLE = 'SET_IS_FILTERS_VISIBLE';
export const ACTION_SET_SEARCH_PARSED = 'SET_SEARCH_PARSED';

export function setFrom (from) {
  return {
    type: ACTION_SET_FROM,
    payload: from,
  };
}
export function setTo (to) {
  return {
    type: ACTION_SET_TO,
    payload: to,
  };
}
export function setDepartDate (departDate) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate,
  };
}
export function setHighSpeed (highSpeed) {
  return {
    type: ACTION_SET_HIGH_SPEED,
    payload: highSpeed,
  };
}
export function toggleHighSpeed () {
  return (dispatch, getState) => {
    const { highSpeed } = getState();

    dispatch(setHighSpeed(!highSpeed));
  }
}
// 最大的列表
export function setTrainList (trainList) {
  return {
    type: ACTION_SET_TRAIN_LIST,
    payload: trainList,
  };
}
// 切换出发早到晚和耗时早到长
export function toggleOrderType () {
  return (dispatch, getState) => {
    const { orderType } = getState();
    if (orderType === ORDER_DEPART) {
      dispatch({
        type: ACTION_SET_ORDER_TYPE,
        payload: ORDER_DURATION,
      });
    } else {
      dispatch({
        type: ACTION_SET_ORDER_TYPE,
        payload: ORDER_DEPART,
      });
    }
  };
}
// 切换只看有票
export function toggleOnlyTickets () {
  return (dispatch, getState) => {
    const { onlyTickets } = getState();

    dispatch({
      type: ACTION_SET_ONLY_TICKETS,
      payload: !onlyTickets,
    });
  };
}

// 票类型
export function setTicketTypes (ticketTypes) {
  return {
    type: ACTION_SET_TICKET_TYPES,
    payload: ticketTypes,
  };
}
// 选中的票类型
export function setCheckedTicketTypes (checkedTicketTypes) {
  return {
    type: ACTION_SET_CHECKED_TICKET_TYPES,
    payload: checkedTicketTypes,
  };
}
// 车次类型
export function setTrainTypes (trainTypes) {
  return {
    type: ACTION_SET_TRAIN_TYPES,
    payload: trainTypes,
  };
}
// 选中的车次类型
export function setCheckedTrainTypes (checkedTrainTypes) {
  return {
    type: ACTION_SET_CHECKED_TRAIN_TYPES,
    payload: checkedTrainTypes,
  };
}
// 出发车站
export function setDepartStations (departStations) {
  return {
    type: ACTION_SET_DEPART_STATIONS,
    payload: departStations,
  };
}
// 选中的出发车站
export function setCheckedDepartStations (checkedDepartStations) {
  return {
    type: ACTION_SET_CHECKED_DEPART_STATIONS,
    payload: checkedDepartStations,
  };
}
// 到达车站
export function setArriveStations (arriveStations) {
  return {
    type: ACTION_SET_ARRIVE_STATIONS,
    payload: arriveStations,
  };
}
// 选中的到达车站
export function setCheckedArriveStations (checkedArriveStations) {
  return {
    type: ACTION_SET_CHECKED_ARRIVE_STATIONS,
    payload: checkedArriveStations,
  };
}
// 出发时间的起始点
export function setDepartTimeStart (departTimeStart) {
  return {
    type: ACTION_SET_DEPART_TIME_START,
    payload: departTimeStart,
  };
}
// 出发时间的截至
export function setDepartTimeEnd (departTimeEnd) {
  return {
    type: ACTION_SET_DEPART_TIME_END,
    payload: departTimeEnd,
  };
}
// 到达时间起点
export function setArriveTimeStart (arriveTimeStart) {
  return {
    type: ACTION_SET_ARRIVE_TIME_START,
    payload: arriveTimeStart,
  };
}
// 到达时间终点
export function setArriveTimeEnd (arriveTimeEnd) {
  return {
    type: ACTION_SET_ARRIVE_TIME_END,
    payload: arriveTimeEnd,
  };
}
// 综合浮层的显示隐藏
export function toggleIsFiltersVisible () {
  return (dispatch, getState) => {
    const { isFiltersVisible } = getState();
    dispatch({
      type: ACTION_SET_IS_FILTERS_VISIBLE,
      payload: !isFiltersVisible,
    });
  };
}
// 查询标志位
export function setSearchParsed (searchParsed) {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed,
  };
}
// 切换离开时间 后一天
export function nextDate () {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(h0(departDate) + 86400 * 1000));
  };
}
// 切换离开时间 前一天
export function prevDate () {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
  };
}