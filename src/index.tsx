import React from 'react';
import ReactDOM from 'react-dom';
import { message } from 'antd';

import { GatewayNavigator } from 'services/Gateway';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './index.less';
import reportWebVitals from './reportWebVitals';

message.config({
  top: 15,
});

ReactDOM.render(
  <React.StrictMode>
    <GatewayNavigator />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: () => document.location.reload(),
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
