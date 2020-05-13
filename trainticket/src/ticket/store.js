import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducers, {
  // 出发日期
  departDate: Date.now(),
  // 到达日期，从服务端接口获取
  arriveDate: Date.now(),
  // 接口，出发时间
  departTimeStr: null,
  // 接口，到达时间
  arriveTimeStr: null,
  // url参数，出发车站
  departStation: null,
  // url参数，到达车站
  arriveStation: null,
  // url参数，车次
  trainNumber: null,
  // 运行时间，接口
  durationStr: null,
  // 座次和出票渠道，接口
  tickets: [],
  // 浮层
  isScheduleVisible: false,
  // 解析状态
  searchParsed: false
}, composeWithDevTools(applyMiddleware(thunk)))
export default store;