import React from 'react';
import { Route } from 'react-router-dom';
import { SideTab } from './SideTab';
import { NavBar } from './NavBar';
import { Graph } from './Graph';
import Home from './Home';
import About from './About';
import AppProvider from '../context/AppContext';
import './App.css';

export function App() {
  return (
    <AppProvider>
      <>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/see">
          <div className="row h-100">
            <div className="col-lg h-100" id="graph">
              <Graph />
            </div>
            <div className="col-md-4" id="sidebar">
              <Route component={NavBar} />
              <SideTab />
            </div>
          </div>
        </Route>
      </>
    </AppProvider>
  );
}

export default App;
