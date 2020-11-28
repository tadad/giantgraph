import React from 'react';
import { Route } from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';
import { SideTab } from './Side/SideTab';
import { NavBar } from './Side/NavBar';
import { Graph } from './Graph/Graph';
import { AppContext } from './AppContext';
import './App.css';

const hardData = require('./Renaissance.json'); // needs to be dynamically fetched from server

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: hardData, // eslint-disable-line
      sideIsOpen: false,
      selectedNode: null,
    };

    this.openSide = this.openSide.bind(this);
    this.closeSide = this.closeSide.bind(this);
    this.setNode = this.setNode.bind(this);
  }

  setNode(node) {
    this.setState({ selectedNode: node });
  }

  openSide() {
    this.setState({ sideIsOpen: true });
  }

  closeSide() {
    this.setState({ sideIsOpen: false });
  }

  render() {
    const { data, sideIsOpen, selectedNode } = this.state;
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/see">
          <AppContext.Provider value={{
            data,
            sideIsOpen,
            selectedNode,
            openSide: this.openSide,
            closeSide: this.closeSide,
            setNode: this.setNode,
          }}
          >
            <div className="row">
              <div className="col-md-4" id="sidebar">
                <Route component={NavBar} />
                <SideTab />
              </div>
              <div className="col-lg" id="graph">
                <Graph />
              </div>
            </div>
          </AppContext.Provider>
        </Route>
      </>
    );
  }
}

export default App;
