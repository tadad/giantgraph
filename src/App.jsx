import React from 'react';
import PropTypes from 'prop-types';
import { SideTab } from './Side/SideTab';
import { NavBar } from './Side/NavBar';
import { Graph } from './Graph/Graph';
import './App.css';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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
    this.setState({ open: true });
  }

  closeSide() {
    this.setState({ open: false });
  }

  render() {
    const { open, selectedNode } = this.state;
    const { data } = this.props;

    return (
      <div className="row">
        <div className="col-md-4" id="sidebar">
          <NavBar />
          <SideTab open={open} closeSide={this.closeSide} selectedNode={selectedNode} />
        </div>
        <div className="col-lg" id="graph">
          <Graph
            data={data}
            selectedNode={selectedNode}
            setNode={this.setNode}
            openSide={this.openSide}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default App;
