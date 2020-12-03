import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './SideTab.css';

export function SideTab() {
  const {
    sideIsOpen, selectedNode, selectedSummary, selectedURL, closeSide,
  } = useContext(AppContext);

  return (
    <>
      {sideIsOpen
      && (
      <div id="SideTab">
        <button type="button" className="btn close-btn" onClick={closeSide}>&times;</button>
        <a href={selectedURL} target="_blank" rel="noreferrer" id="wiki-link">
          <h1 id="info-title">{selectedNode.name}</h1>
        </a>
        <hr />
        <p id="main-info">{selectedSummary}</p>
      </div>
      )}
    </>
  );
}

export default SideTab;
