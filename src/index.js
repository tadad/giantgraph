import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {SideTab} from './Side/SideTab.js';
import {NavBar} from './Side/NavBar.js';
import {Graph} from './Graph/Graph.js';

ReactDOM.render(
  <React.StrictMode>
      <SideTab/>
      <NavBar/>
  </React.StrictMode>,
  document.getElementById('sidebar')
);

const data = require('./Renaissance.json'); // needs to be dynamically fetched from server

ReactDOM.render(
  <Graph data={data}/>,
  document.getElementById('graph')
);

 

