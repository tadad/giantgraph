import React from 'react';
import { SideTab } from './Side/SideTab.js';
import { NavBar } from './Side/NavBar.js';
import { Graph } from './Graph/Graph.js';
import { AppContext } from './AppContext';
import './App.css';

const data = require('./Renaissance.json'); // needs to be dynamically fetched from server

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data,
      sideIsOpen: false,
      selectedNode: {name: "test", description: "test desc", href: "ref", id: 0},
    };

    this.openSide = this.openSide.bind(this);
    this.closeSide = this.closeSide.bind(this);
    this.setNode = this.setNode.bind(this);
  }

  openSide() {
    this.setState({sideIsOpen:true});
  }

  closeSide() {
    this.setState({sideIsOpen:false});
  }

  setNode(node) {
    this.setState({selectedNode: node});
  }

  render() {
    return (
      <AppContext.Provider value={{
        data: this.state.data, 
        sideIsOpen: this.state.sideIsOpen, 
        selectedNode: this.state.selectedNode, 
        openSide: this.openSide, 
        closeSide: this.closeSide, 
        setNode: this.setNode
      }}>
        <div className='row'>
          <div className='col-md-4' id="sidebar">
            <NavBar />
            <SideTab />
          </div>
          <div className='col-lg' id="graph">
            <Graph />
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;

