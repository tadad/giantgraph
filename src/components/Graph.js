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
    const {
      data, selectedNode, setNode, openSide,
    } = this.context;

    return (
      <AppContext.Consumer>
        {(context) => {
          // fix this conditional
          if (context.data && !context.data.nodes) { return <div> Loading </div>; }
          return (
            <div style={{ cursor }}>
              <ForceGraph2D
                ref={this.fgRef}
                graphData={data}
                enableNodeDrag={false}
                nodeLabel="description"
                nodeCanvasObject={(node, ctx, globalScale) => {
                  const { hoverNode, visited } = this.state;
                  // this formula has to change
                  const fontSize = Math.max((node.value * 300) / globalScale, 2);

                  ctx.font = `${fontSize}px Times-new-roman`;

                  // fontsize won't need to be calculated in front-end once server is hooked up
                  node.val = fontSize; // eslint-disable-line

                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';

                  // switch temp-variable at end
                  // I'm just gonna like not even comment on this but yeah I gagged
                  let color;
                  if (selectedNode && selectedNode.id === node.id) {
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
                    this.setState({ cursor: 'pointer', hoverNode: node });
                  } else {
                    this.setState({ cursor: 'default', hoverNode: null });
                  }
                }}
                onNodeClick={(node) => {
                  if (node) {
                    const { visited } = this.state;
                    setNode(node);
                    openSide();

                    const newHighlightLinks = new Set(data.links.filter(
                      (link) => link.source.id === node.id || link.target.id === node.id,
                    ));

                    this.setState({ highlightLinks: newHighlightLinks });

                    this.setState({ visited: visited.add(node.id) });
                    // ^problems with this:
                    //    b) You're doing logic in a setState

                    // Change node.x to something to do with screen width
                    this.fgRef.current.centerAt(node.x - 40, node.y, 1000);
                    this.fgRef.current.zoom(5, 2000);
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
          );
        }}
      </AppContext.Consumer>
    );
  }
}

Graph.contextType = AppContext;

export default Graph;
