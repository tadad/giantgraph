import React from 'react';
import PropTypes from 'prop-types';
import './SideTab.css';

export function SideTab(props) {
  const { open, closeSide, selectedNode } = props;

  if (!open) {
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

SideTab.defaultProps = {
  selectedNode: {},
};

SideTab.propTypes = {
  open: PropTypes.bool.isRequired,
  closeSide: PropTypes.func.isRequired,
  selectedNode: PropTypes.shape({
    id: PropTypes.number.isRequired,
    href: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    value: PropTypes.number.isRequired,
  }),
};

export default SideTab;
