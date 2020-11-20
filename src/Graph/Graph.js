import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.fgRef = React.createRef();
        this.state = {
            selectedNode: "",
            hoverNode: "",
            visited: new Set(),
            highlightLinks: new Set()
        }
    }

    render() {
        return (
            <ForceGraph2D
                ref={this.fgRef}
                graphData={this.props.data}
                enableNodeDrag={false}
                nodeLabel='href'
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const fontSize = Math.max((node.value * 300) / globalScale, 2); // this formula has to change with the 

                    ctx.font = `${fontSize}px Times-new-roman`;
                    node.val = fontSize;

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    
                    if (this.props.node && this.props.node.id === node.id) { // probably a way to optimize this control flow...
                        ctx.fillStyle = '#0000FF';
                    } else if (this.state.hoverNode === node) {
                        ctx.fillStyle = '#751F80';
                    } else if (this.state.visited.has(node.id)) {
                        ctx.fillStyle = '#751F80';
                    } else {
                        ctx.fillStyle = '#0645BD'
                    }

                    ctx.fillText(node.name, node.x, node.y);
                }}
                onNodeHover={node => {
                    if (node) {
                        document.body.style.cursor = 'pointer';
                        this.setState({hoverNode: node});
                    } else {
                        document.body.style.cursor = 'default';
                        this.setState({hoverNode: null});
                    }
                }}
                onNodeClick={node => { // FIX THIS REACT
                    if (node) {
                        this.props.setNode(node);
                        this.props.openSide();
                        
                        let highlightLinks = new Set();
                        for (var link of this.props.data.links) { // there must be a way to optimize this
                            if (link.source.id === node.id || link.target.id === node.id) {
                                highlightLinks.add(link);
                            }
                        }
                        this.setState({highlightLinks: highlightLinks});
                        this.setState({visited: this.state.visited.add(node.id)})
                        this.fgRef.current.centerAt(node.x - 40, node.y, 1000); // Change node.x to something to do with screen width
                        this.fgRef.current.zoom(5, 2000);
                    }
                }}
                onBackgroundClick={() => {
                    this.setState({highlightLinks: new Set()});
                }}
                linkWidth={link => 
                    this.state.highlightLinks.has(link) ? 5 : 1
                }
                cooldownTicks={50}
                onEngineStop={() => this.fgRef.current.zoomToFit(400)}
            />
        );
    }
};

export default Graph;