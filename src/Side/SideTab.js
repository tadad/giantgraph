import React from 'react';
import './SideTab.css'

export class SideTab extends React.Component {   
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            title: "title init",
            text: "p init",
            outlink: "https://google.com",
        };

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    
    close() { // FIX THIS TO BE NOT TERRIBLE
        this.setState({open:false});

        document.getElementById("side").style.width = "0";
        document.getElementById('main-info').innerHTML = '';
        document.getElementById('info-title').innerHTML = '';
        document.getElementById('wiki-link').innerHTML = '';
        document.getElementById('wiki-link').href = '';
        document.getElementById("side").style.padding = "0";
        document.getElementById("side").style.border = "";
    }

    open() {
        document.getElementById("side").style.width = "33%";
        document.getElementById("side").style.padding = "15px";
        document.getElementById("side").style.border = 'solid #A7D7F9 1px';
    }

    render() {
        if (!this.state.open) {
            return null;
        }
        return (
        <div id='side' className='col-md-4'>
            <button className='btn close-btn' onClick={this.close}>&times;</button>
            <h1 id='info-title'>{this.state.title}</h1>
            <hr />
            <p id='main-info'>{this.state.text}</p>
            <p><a href={this.state.outlink} target='_blank' rel="noreferrer" id='wiki-link'>Read More</a></p>
        </div>
        );
    }
}

export default SideTab;