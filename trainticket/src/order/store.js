import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducers, {
  trainNumber: null,
  departStation: null,
  arriveStation: null,
  seatType: null,
  departDate: Date.now(),
  arriveDate: Date.now(),
  departTimeStr: null,
  arriveTimeStr: null,
  durationStr: null,
  price: null,
  passengers: [],
  menu: null,
  isMenuVisible: false,
  searchParsed: false
}, composeWithDevTools(applyMiddleware(thunk)))
export default store;