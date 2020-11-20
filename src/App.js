import React from 'react';
import './index.css';
import {SideTab} from './Side/SideTab.js';
import {NavBar} from './Side/NavBar.js';
import {Graph} from './Graph/Graph.js';


export function App(props) {
    return (
        <React.StrictMode>
            <div class='col-lg' id="graph">
                <Graph data={this.props.data}/>
            </div>
            <div class='col-md-4' id="sidebar" style={{position: "fixed"}}>
                <SideTab/>
                <NavBar/>
            </div>
        </React.StrictMode>
    );
}

export default App;

