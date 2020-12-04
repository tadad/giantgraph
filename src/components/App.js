import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
      <Switch>
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
        <Route>
          <div className="row h-75">
            <div className="col-lg-6 offset-md-3 my-auto">
              <h1 className="text-center">🥴</h1>
              <h1 className="text-center">Sorry we can&apos;t find that page</h1>
            </div>
          </div>
        </Route>
      </Switch>
    </AppProvider>
  );
}

export default App;
