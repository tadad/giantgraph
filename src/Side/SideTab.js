import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import './SideTab.css';

export function SideTab() {
  const { sideIsOpen, selectedNode, closeSide } = useContext(AppContext);

  if (!sideIsOpen) {
    return null;
  }
  return (
    <div id="SideTab">
      <button type="button" className="btn close-btn" onClick={closeSide}>&times;</button>
      <h1 id="info-title">{selectedNode.name}</h1>
      <hr />
      <p id="main-info">{selectedNode.description}</p>
      <p><a href={selectedNode.href} target="_blank" rel="noreferrer" id="wiki-link">Read More</a></p>
    </div>
  );
}

export default SideTab;
