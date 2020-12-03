import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { AppContext } from '../context/AppContext';

export class Graph extends React.Component {
  constructor() {
    super();

    this.fgRef = React.createRef(); // Couldn't find a way to do this without refs...
    this.state = {
      hoverNode: '',
      cursor: 'default',
      visited: new Set(),
      highlightLinks: new Set(),
    };
  }

  render() {
    const { cursor } = this.state;
    if (this.context.data.nodes.length === 0 && this.context.searchValue) { //eslint-disable-line 
      return (
        <h1
          className="my-auto"
          style={{
            top: '45%', left: '45%', position: 'fixed', textShadow: '0 0 30px #0A0A0A',
          }}
        >
          Loading...
        </h1>
      );
    }
    return (
      <AppContext.Consumer>
        {(context) => (
          <div style={{ cursor }}>
            <ForceGraph2D
              ref={this.fgRef}
              graphData={context.data}
              enableNodeDrag={false}
              nodeLabel="description"
              nodeVal={(node) => [1, 5, 25, 45][node.val]}
              // nodeCanvasObjectMode="after"
              nodeCanvasObject={(node, ctx, globalScale) => {
                const { hoverNode, visited } = this.state;
                const fontSize = Math.max([1, 5, 25, 45][node.val] / globalScale, 4);
                // node.val = fontSize; // eslint-disable-line
                ctx.font = `${fontSize}px Times-new-roman`;

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // switch temp-variable at end
                // I'm just gonna like not even comment on this but yeah I gagged
                let color;
                if (context.selectedNode && context.selectedNode.id === node.id) {
                  color = '#0000FF';
                } else if (hoverNode === node) {
                  color = '#751F80';
                } else if (visited.has(node.id)) {
                  color = '#751F80';
                } else {
                  color = '#0645BD';
                }

                ctx.fillStyle = color;

                ctx.fillText(node.name, node.x, node.y);
              }}
              onNodeHover={(node) => {
                if (node) {
                  const newHighlightLinks = new Set(context.data.links.filter(
                    (link) => link.source.id === node.id || link.target.id === node.id,
                  ));

                  this.setState({ highlightLinks: newHighlightLinks, cursor: 'pointer', hoverNode: node });
                } else {
                  this.setState({ cursor: 'default', hoverNode: null });
                }
              }}
              onNodeClick={(node) => {
                if (node) {
                  const { visited } = this.state;
                  context.setNode(node);
                  context.openSide();

                  this.setState({ visited: visited.add(node.id) });
                  // ^problems with this:
                  //    b) You're doing logic in a setState

                  // node moving around
                  // this.fgRef.current.centerAt(node.x - 100, node.y, 1000);
                  // this.fgRef.current.zoom(1, 2000);
                }
              }}
              onBackgroundClick={() => {
                this.setState({ highlightLinks: new Set() });
              }}
              // no need to destructure here
              linkWidth={(link) => (this.state.highlightLinks.has(link) ? 5 : 1)} // eslint-disable-line
              cooldownTicks={50}
              onEngineStop={() => this.fgRef.current.zoomToFit(400)}
            />
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

Graph.contextType = AppContext;

export default Graph;
