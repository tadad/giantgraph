import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { AppContext } from '../AppContext';

export class Graph extends React.Component {
  constructor(props) { // you don't need props if you don't use them anywhere else in the component (true for all other components)
    super(props);
    this.fgRef = React.createRef(); // looks like there isn't really a way to do this without refs, but refs are generally considered ugly
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
          if (selectedNode && selectedNode.id === node.id) { // I'm just gonna like not even comment on this but yeah I gagged
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
        onNodeHover={(node) => { // change node to hoverNode so you can use { hoverNode } in the setState
          if (node) {
            document.body.style.cursor = 'pointer'; // didn't we already talk about not using document.x- it's fine to use inline styles in this case
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
            data.links.forEach((link) => { // you're joking right - look at map, filter, and reduce
              // there are like 3 valid use cases for forEach and this is definitely not one of them
              if (link.source.id === node.id || link.target.id === node.id) {
                newHighlightLinks.add(link);
              }
            });

            this.setState({ highlightLinks: newHighlightLinks });
            this.setState({ visited: visited.add(node.id) }); // this is disgusting please look at spread syntax
            // ^problems with this: 
            //    a) You're using the visited state value without doing a callback (possibility of async fucking stuff up)
            //    b) You're doing logic in a setState
            //    c) You're appending to a list state element - spread syntax

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
