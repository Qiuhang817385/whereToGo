import React from 'react';
import ReactDom from 'react-dom';
import './css/index.css'
import App from './App';
import { Provider } from 'react-redux';
import store from './store'
import 'normalize.css';
console.log('OrderApp', App)
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));