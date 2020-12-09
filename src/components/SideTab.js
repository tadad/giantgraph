import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './SideTab.css';

export function SideTab() {
  const {
    sideIsOpen, selectedURL,
  } = useContext(AppContext);

  const mobileURL = selectedURL.split('.');
  mobileURL.splice(1, 0, 'm');

  return (
    <>
      {!sideIsOpen
        && (
        <div className="preclick-message">
          <div style={{ padding: '30px' }}>
            <img src={`${process.env.PUBLIC_URL}/wg_small.png`} alt="" style={{ maxWidth: '20%' }} />
            <img src={`${process.env.PUBLIC_URL}/wg_text.png`} alt="Wikigraph" style={{ maxWidth: '80%' }} />
          </div>
          <p className="text-muted">Click a node to pull up more info here</p>
          <p className="text-muted">Drag nodes to reposition them</p>
        </div>
        )}
      {sideIsOpen
      && (
      <div id="SideTab">
        {
          selectedURL && (
            <iframe title="iframe" className="wiki-iframe" src={mobileURL.join('.')} />
          )
        }
      </div>
      )}
    </>
  );
}

export default SideTab;
