import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { AppContext } from '../AppContext';

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
    const {
      data, selectedNode, setNode, openSide,
    } = this.context;
    return (
      <ForceGraph2D
        ref={this.fgRef}
        graphData={data}
        enableNodeDrag={false}
        nodeLabel="href"
        nodeCanvasObject={(node, ctx, globalScale) => {
          const { hoverNode, visited } = this.state;
          // this formula has to change
          const fontSize = Math.max((node.value * 300) / globalScale, 2);

          ctx.font = `${fontSize}px Times-new-roman`;

          // we are eventually removing almost everything from here so disable is fine
          node.val = fontSize; // eslint-disable-line

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // probably a way to optimize this control flow...
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
            document.body.style.cursor = 'pointer';
            this.setState({ hoverNode: node });
          } else {
            document.body.style.cursor = 'default';
            this.setState({ hoverNode: null });
          }
        }}
        onNodeClick={(node) => {
          if (node) {
            const { visited } = this.state;
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
        }}
        // lint wants to destructure highlightLinks on next line which is dumb
        linkWidth={(link) => (this.state.highlightLinks.has(link) ? 5 : 1)} // eslint-disable-line
        cooldownTicks={50}
        onEngineStop={() => this.fgRef.current.zoomToFit(400)}
      />
    );
  }
}

Graph.contextType = AppContext;

export default Graph;
