import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';

const data = require('./Renaissance.json'); // needs to be dynamically fetched from server

ReactDOM.render(
  <App data={data} />,
  document.getElementById('root'),
);
