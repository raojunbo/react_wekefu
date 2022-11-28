import React from 'react';
import ReactDOM from 'react-dom/client';
// 路由
import { BrowserRouter } from 'react-router-dom'
// redux
import { Provider } from 'react-redux'

import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
// import "normalize.css"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 在最外层套一个Provider。表示数据的提供者虚拟节点。
  // Provider 实际上是一个监听，监听store状态里值的变化。
  // <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
