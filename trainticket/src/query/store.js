import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { h0 } from './../utils/utils';
import { ORDER_DEPART } from './constant';
const store = createStore(reducers,
  {
    // ============================================================底部导航和日期控件部分
    from: null,
    to: null,
    // 出发日期,去除小时分钟秒
    departDate: h0(Date.now()),
    // 是否选择高铁,只看高铁动车
    highSpeed: false,
    // ============================================================列表部分
    trainList: [],
    // 出发早到晚1,2是耗时早到长
    orderType: ORDER_DEPART,
    // 只看有票
    onlyTickets: false,
    // 票类型
    ticketTypes: [],
    // 选中的票类型
    checkedTicketTypes: {},
    // 车次类型
    trainTypes: [],
    // 选中的车次类型
    checkedTrainTypes: {},
    // 出发车站
    departStations: [],
    // 选中的出发车站
    checkedDepartStations: {},
    // 到达车站
    arriveStations: [],
    // 选中的到达车站
    checkedArriveStations: {},
    // 出发时间的起始点
    departTimeStart: 0,
    // 出发时间的截至
    departTimeEnd: 24,
    // 到达时间起点
    arriveTimeStart: 0,
    // 到达时间终点
    arriveTimeEnd: 24,
    // 综合浮层的显示隐藏
    isFiltersVisible: false,
    // 程序一启动,必须立即解析地址栏的查询参数,用于向服务端查询必要的数据
    // 我们只能在解析完成之后再去useEffect里面发送副作用,标识解析完成
    searchParsed: false,
  },
  composeWithDevTools(applyMiddleware(thunk)))
export default store;