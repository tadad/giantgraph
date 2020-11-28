import React from 'react';
import { Route } from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';
import { SideTab } from './Side/SideTab';
import { NavBar } from './Side/NavBar';
import { Graph } from './Graph/Graph';
import AppProvider from './AppContext';
import './App.css';

export function App() {
  return (
    <>
      <AppProvider>
        <Route exact path="/" component={Home} />
      </AppProvider>
      <Route path="/about" component={About} />
      <Route path="/see">
        <AppProvider>
          <div className="row">
            <div className="col-md-4" id="sidebar">
              <Route component={NavBar} />
              <SideTab />
            </div>
            <div className="col-lg" id="graph">
              <Graph />
            </div>
          </div>
        </AppProvider>
      </Route>
    </>
  );
}

export default App;
