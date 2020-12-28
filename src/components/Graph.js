import React from 'react';
import PropTypes from 'prop-types';
import ForceGraph2D from 'react-force-graph-2d';
import { withRouter } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverNode: '',
      cursor: 'default',
      visited: new Set(),
      highlightOnHover: true,
      highlightLinks: new Set(),
    };
  }

  componentDidMount() {
    const { getData, dataIsComing } = this.context;
    if (!dataIsComing) {
      const loc = window.location.pathname.split('/');
      if (loc.length > 2) {
        const searchVal = loc[2];
        getData(searchVal);
      }
    }
  }

  render() {
    const { cursor } = this.state;
    if (
      this.context.data.nodes !== undefined && //eslint-disable-line 
      this.context.data.nodes.length === 0 && //eslint-disable-line 
      this.context.searchValue //eslint-disable-line 
    ) {
      return (
        <h1
          className="my-auto"
          style={{
            top: '49%', left: '49%', position: 'fixed',
          }}
        >
          ⌛
        </h1>
      );
    }
    return (
      <AppContext.Consumer>
        {(context) => (
          <div style={{ cursor }}>
            <ForceGraph2D
              graphData={context.data}
              onNodeDragEnd={(node) => {
                node.fx = node.x; // eslint-disable-line
                node.fy = node.y; // eslint-disable-line
              }}
              nodeLabel="description"
              nodeVal={(node) => [1, 5, 25, 45][node.val]}
              nodeCanvasObject={(node, ctx, globalScale) => {
                const { hoverNode, visited } = this.state;
                const fontSize = Math.max([1, 5, 25, 45][node.val] / globalScale, 4);
                ctx.font = `${fontSize}px Times-new-roman`;

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // switch temp-variable at end
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
                  const { highlightOnHover } = this.state;

                  if (highlightOnHover) {
                    const newHighlightLinks = new Set(context.data.links.filter(
                      (link) => link.source.id === node.id || link.target.id === node.id,
                    ));
                    this.setState({ highlightLinks: newHighlightLinks });
                  }

                  const { name } = node;
                  window.analytics.track('nodehover', {
                    name,
                  });

                  this.setState({ cursor: 'pointer', hoverNode: node });
                } else {
                  this.setState({ cursor: 'default', hoverNode: null });
                }
              }}
              onNodeClick={(node) => {
                if (node) {
                  const { visited } = this.state;

                  const newHighlightLinks = new Set(context.data.links.filter(
                    (link) => link.source.id === node.id || link.target.id === node.id,
                  ));
                  this.setState({ highlightLinks: newHighlightLinks });

                  context.setNode(node);
                  context.openSide();

                  this.setState({ visited: visited.add(node.id) });
                  this.setState({ highlightOnHover: false });

                  const { name } = node;
                  window.analytics.track('nodeclick', {
                    name,
                  });
                }
              }}
              onBackgroundClick={() => {
                this.setState({ highlightLinks: new Set(), highlightOnHover: true });
              }}
              // no need to destructure here
              linkWidth={(link) => (this.state.highlightLinks.has(link) ? 5 : 1)} // eslint-disable-line
              // cooldownTicks={50}
            />
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

Graph.contextType = AppContext;

Graph.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line
};

export default withRouter(Graph);
