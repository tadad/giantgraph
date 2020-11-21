import React from 'react';
import { SideTab } from './Side/SideTab.js';
import { NavBar } from './Side/NavBar.js';
import { Graph } from './Graph/Graph.js';
import './App.css';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            node: null,
            searchTerm: ""
        }

        this.openSide = this.openSide.bind(this);
        this.closeSide = this.closeSide.bind(this);
        this.setNode = this.setNode.bind(this);
    }

    openSide() {
        this.setState({ open: true });
    }

    closeSide() {
        this.setState({ open: false });
    }

    setNode(node) {
        this.setState({ node: node });
    }

    setSearchTerm = (searchTerm) => {
        this.setState({ searchTerm })
    }

    render() {
        return (
            <div className='row'>
                {/* <p>Flask Token = {window.token}</p> */}
                <div className='col-md-4' id="sidebar">
                    <NavBar />
                    <SideTab open={this.state.open} closeSide={this.closeSide} node={this.state.node} />
                </div>
                <div className='col-lg' id="graph">
                    <Graph searchTerm={this.state.searchTerm} node={this.state.node} setNode={this.setNode} openSide={this.openSide} closeSide={this.closeSide} />
                </div>
            </div>
        );
    }
}

export default App;

