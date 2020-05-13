import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducers, {
  from: '北京',
  to: '上海',
  // 城市浮层开关
  isCitySelectorVisible: false,
  // 数据回填的地方     默认值
  currentSelectingLeftCity: false,
  // 城市数据
  cityData: null,
  // 节流,loading
  isLoadingCityData: false,
  // 日期浮层开关
  isDateSelectorVisible: false,
  // 高铁
  highSpeed: false,
  departDate: Date.now(),
}, composeWithDevTools(applyMiddleware(thunk)))
export default store;