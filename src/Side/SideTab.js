import React from 'react';
import './SideTab.css'

export class SideTab extends React.Component {   
    render() {
        if (!this.props.open) {
            return null;
        }
        return (
            <div id='SideTab'>
                <button className='btn close-btn' onClick={this.props.closeSide}>&times;</button>
                <h1 id='info-title'>{this.props.node.name}</h1>
                <hr />
                <p id='main-info'>{this.props.node.description}</p>
                <p><a href={this.props.node.href} target='_blank' rel="noreferrer" id='wiki-link'>Read More</a></p>
            </div>
        );
    }
}

export default SideTab;