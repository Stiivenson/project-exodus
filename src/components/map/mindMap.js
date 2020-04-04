import React, { Component} from 'react';
import Graph from "react-graph-vis";

class MindMap extends Component {  
  constructor(props) {
    super(props);
    
    let initialGraph = {};
    initialGraph.nodes = this.props.map_component.nodes;
    initialGraph.edges = this.props.map_component.edges;

    this.state = {
      graph: initialGraph,
      options: this.props.map_component.options,
      style: { width: "100%", height: "100%" },
      counter: 1,
      selectedNode: 1,
      network: null,
      edit_mode: false
    };

    this.events = {
      click:      (event) => this.onClick(event),
      dragStart:  (event) => this.onDragStart(event.pointer.DOM),
      dragging:   (event) => this.onDragging(event.pointer.DOM),
      selectNode: (event) => this.onSelectNode(event.nodes[0]),
    }
  }

  //Init functions--------------------------->
  setState(stateObj) {
    if (this.mounted) {
      super.setState(stateObj);
    }
  }

  measure = (data) => {
    this.state.network.redraw();
    this.state.network.fit();
  }

  getNetwork = data => {
    this.setState({ network: data });    
  };

  getEdges = data => {
  };

  getNodes = data => {
  };

  componentWillMount() {
    this.mounted = true;
  }

  componentDidMount() {
    this.mounted = true;
    window.addEventListener("resize", this.measure);
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener("resize", this.measure);
  }

  //On event functions--------------------------->

  onClick = (e) => {
    //console.log(e.pointer.canvas);
  }


  onDragStart = (coords) => {
    let selectedNode = this.state.network.getNodeAt(coords);

    //Select all internal nodes fo selected one (children of children of ...)
    if(selectedNode && selectedNode!==1){
      this.setState({selectedNode: selectedNode});

      let allChildNode = new Set(),
          temporaryParent = new Set(),
          toAdd = new Set(),
          end = false;
    
      temporaryParent.add(selectedNode);
      do {
        end = false;        
        if(temporaryParent.size > 0){
          temporaryParent.forEach(node => {
            allChildNode.add(node);        
            let childNodes = this.state.network.getConnectedNodes(node, 'to');
            if(childNodes.length > 0){
              childNodes.map(el => {
                toAdd.add(el);                
              });                        
              end = true;
            };
          }); 
        }

        temporaryParent.clear();
        toAdd.forEach(elem => { temporaryParent.add(elem); });  
        toAdd.clear();

      } while (end);
      this.state.network.selectNodes([...allChildNode]);
    } 
  }

  onDragging = (e) => {
  }

  onSelectNode = (id) => {
    if(id){
      this.setState({selectedNode: id});
      console.log('onSelectNode ', this.state.selectedNode);
    }
  }

  //UI functions--------------------------->
  
  //Add new Node to selected one
  addNode = () => {
    let newId = this.state.counter + 1,
        parentId = this.state.selectedNode,
        parentCoords =   this.state.network.getPositions(parentId);

    let newX = parentCoords[parentId].x + 100,
        newY = parentCoords[parentId].y;

    this.setState({counter: newId})
    this.state.network.body.data.nodes.add({id: newId, label: 'new', x: newX, y: newY});
    this.state.network.body.data.edges.add({from: parentId, to: newId});
  }

  //Render function--------------------------->

  render() {
    return (
      <>
        <Graph
          graph={this.state.graph}
          style={this.state.style}
          options={this.state.options}
          events={this.events}
          getNetwork={this.getNetwork}
          getEdges={this.getEdges}
          getNodes={this.getNodes}
          vis={vis => (this.vis = vis)}
        />
        <button className='map-button' onClick={this.addNode}>Add node to Selected</button>
      </>
    );
  }
}

export default MindMap;
