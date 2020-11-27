import React, {useContext} from 'react';
import { AppContext } from '../AppContext';
import './SideTab.css'

export function SideTab() {
  let context = useContext(AppContext);

  if (!context.sideIsOpen) {
    return null;
  }
  return (
    <div id='SideTab'>
      <button className='btn close-btn' onClick={context.closeSide}>&times;</button>
      <h1 id='info-title'>{context.selectedNode.name}</h1>
      <hr />
      <p id='main-info'>{context.selectedNode.description}</p>
      <p><a href={context.selectedNode.href} target='_blank' rel="noreferrer" id='wiki-link'>Read More</a></p>
    </div>
  );
}

export default SideTab;
