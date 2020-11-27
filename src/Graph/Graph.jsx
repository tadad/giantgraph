import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import PropTypes from 'prop-types';
import { pointer } from './Graph.css';

export class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.fgRef = React.createRef();
    this.state = {
      hoverNode: '',
      visited: new Set(),
      highlightLinks: new Set(),
    };
  }

  render() {
    const { hoverNode, visited, highlightLinks } = this.state;
    const {
      data, selectedNode, setNode, openSide,
    } = this.props;

    return (
      <ForceGraph2D
        className={hoverNode === null ? pointer : null}
        ref={this.fgRef}
        graphData={data}
        enableNodeDrag={false}
        nodeLabel="href"
        nodeCanvasObject={(node, ctx, globalScale) => {
          // Need to change this formula when we have a better "val" formula
          const fontSize = Math.max((node.value * 300) / globalScale, 2);

          ctx.font = `${fontSize}px Times-new-roman`;

          // REMOVE THE LINT DISABLE LATER
          // eslint-disable-next-line
          node.val = fontSize;

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // probably a way to optimize this control flow...
          // REMOVE THIS LINT DISABLE LATER
          // eslint-disable-next-line
          if (selectedNode && selectedNode.id === node.id) {
            ctx.fillStyle = '#0000FF';
          } else if (hoverNode === node) {
            ctx.fillStyle = '#751F80';
          } else if (visited.has(node.id)) {
            ctx.fillStyle = '#751F80';
          } else {
            ctx.fillStyle = '#0645BD';
          }

          ctx.fillText(node.name, node.x, node.y);
        }}
        onNodeHover={(node) => {
          if (node) {
            this.setState({ hoverNode: node });
          } else {
            this.setState({ hoverNode: null });
          }
        }}
        onNodeClick={(node) => { // FIX THIS REACT
          if (node) {
            setNode(node);
            openSide();

            const newHighlightLinks = new Set();
            data.links.forEach((link) => {
              if (link.source.id === node.id || link.target.id === node.id) {
                newHighlightLinks.add(link);
              }
            });

            this.setState({ highlightLinks: newHighlightLinks });
            this.setState({ visited: visited.add(node.id) });

            // Change node.x to something to do with screen width
            this.fgRef.current.centerAt(node.x - 40, node.y, 1000);
            this.fgRef.current.zoom(5, 2000);
          }
        }}
        onBackgroundClick={() => {
          this.setState({ highlightLinks: new Set() });
        //   this.setState({ selectedNode: 1 });
        }}
        linkWidth={(link) => (highlightLinks.has(link) ? 5 : 1)}
        cooldownTicks={50}
        onEngineStop={() => this.fgRef.current.zoomToFit(400)}
      />
    );
  }
}

Graph.defaultProps = {
  selectedNode: {},
};

Graph.propTypes = {
  data: PropTypes.shape().isRequired,
  selectedNode: PropTypes.shape({}),
  setNode: PropTypes.func.isRequired,
  openSide: PropTypes.func.isRequired,
};

export default Graph;
