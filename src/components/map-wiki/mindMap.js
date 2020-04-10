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
      network: null,
      
      counter: 1,

      creationNodesEnabled: false,
      selectedNode: 1,
      editNodeMode: false,

      
      EDIT_MODE: false,
      scale: 0,
      onHover: false
    };

    this.events = {
      click:      (event) => this.onClick(event.pointer.DOM),
      doubleClick: (event) => this.onDoubleClick(event),
      dragStart:  (event) => this.onDragStart(event.pointer.DOM),
      dragging:   (event) => this.onDragging(event.pointer.DOM),
      blurNode:   (event) => this.onBlurNode(event),
      hoverNode:  (event) => this.onHoverNode(event),
      selectNode: (event) => this.onSelectNode(event.nodes[0]),
      deselectNode: (event) => this.onDeselectNode(event.pointer.DOM)
    }
  }

  //Init functions--------------------------->
  setState(stateObj) {
    if (this.mounted) {
      super.setState(stateObj);
    }
  }

  measure = () => {
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

  onClick = (coords) => {
    let id = this.state.network.getNodeAt(coords);
    
    if (id){

      if (id === 'temp1' || id === 'temp2' || id === 'temp3' || id === 'temp4') {
        this.addNode(id);
      }     

    } 
  }


  onDoubleClick = (e) => {
    console.log('onDoubleClick');
    if(!this.state.editNodeMode){
      console.log(this.state.editNodeMode);
      
      this.setState({editNodeMode: true});
    }
  }

  onDragStart = (coords) => {
    let selectedNode = this.state.network.getNodeAt(coords);

    //Select all internal nodes of selected one (children of children of ...)
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

  onHoverNode = (e) => {
    //let DOMcoord = e.pointer.DOM;
  }

  onBlurNode = (e) => {
    //let DOMcoord = e.pointer.DOM;
  }

  onSelectNode = (id) => {
    if(id){     
      this.setState({selectedNode: id});

      if(!this.state.creationNodesEnabled){
        let parentCoords =   this.state.network.getPositions(id),
        parentLength = this.state.network.canvas.body.nodes[id].labelModule.size,
        parentX = parentCoords[id].x,
        parentY = parentCoords[id].y;
      
        let creationNodes = [
          {
            id: 'temp1',
            color: {background: '#319CFF'},
            x: parentX, 
            y: parentY - parentLength.height - 20,
            color: {
              background: '#3C3C3C',
              border: '#3C3C3C',
              highlight:{
                border: '#3C3C3C',
                background: '#3C3C3C'
              },
              hover: {
                border: '#080808',
                background: '#080808'
              }
            },
            shape: 'dot',
            size: 5
          },
          {
            id: 'temp2',
            color: {background: '#319CFF'},
            x: parentX + parentLength.width/2 + 35, 
            y: parentY,
            color: {
              background: '#3C3C3C',
              border: '#3C3C3C',
              highlight:{
                border: '#3C3C3C',
                background: '#3C3C3C'
              },
              hover: {
                border: '#080808',
                background: '#080808'
              }
            },
            shape: 'dot',
            size: 5
          },
          {
            id: 'temp3',
            color: {background: '#319CFF'},
            x: parentX, 
            y: parentY + parentLength.height + 20,
            color: {
              background: '#3C3C3C',
              border: '#3C3C3C',
              highlight:{
                border: '#3C3C3C',
                background: '#3C3C3C'
              },
              hover: {
                border: '#080808',
                background: '#080808'
              }
            },
            shape: 'dot',
            size: 5
          },
          {
            id: 'temp4',
            color: {background: '#319CFF'},
            x: parentX - parentLength.width/2 - 35, 
            y: parentY,
            color: {
              background: '#3C3C3C',
              border: '#3C3C3C',
              highlight:{
                border: '#3C3C3C',
                background: '#3C3C3C'
              },
              hover: {
                border: '#080808',
                background: '#080808'
              }
            },
            shape: 'dot',
            size: 5
          }
        ];

        let creationEdges = [
          {
            id: 'temp1-edge',
            from: id, 
            to: 'temp1',
            chosen: false,
            color: {opacity:0}
          },
          {
            id: 'temp2-edge',
            from: id, 
            to: 'temp2',
            chosen: false,
            color: {opacity:0}
          },
          {
            id: 'temp3-edge',
            from: id, 
            to: 'temp3',
            chosen: false,
            color: {opacity:0}
          },
          {
            id: 'temp4-edge',
            from: id, 
            to: 'temp4',
            chosen: false,
            color: {opacity:0}
          }
        ];

        this.state.network.body.data.nodes.add(creationNodes);
        this.state.network.body.data.edges.add(creationEdges);
        this.setState({creationNodesEnabled: true});

        creationNodes.map(node => {
          this.moveNodeAnim(node.id, parentX, parentY, node.x, node.y, 300);
        });
      }
    }
  }

  moveNodeAnim = (nodeId, x, y, finX, finY, duration) => {
    let startX = x;
    let startY = y;
    let startTime = performance.now();
    let _duration = duration || 1000;

    let move =  () => {
        let time = performance.now();
        let deltaTime = (time - startTime) / _duration;
        let currentX = startX + ((finX - startX) * deltaTime);
        let currentY = startY + ((finY - startY) * deltaTime);
        
        if (deltaTime >= 1) {
          this.state.network.moveNode(nodeId, finX, finY);          
        } else
        {
          this.state.network.moveNode(nodeId, currentX, currentY);
          window.requestAnimationFrame(move);
        }
    }

    move();
  }

  removeCreationNodes = () => {
    this.state.network.body.data.edges.remove('temp1-edge');
    this.state.network.body.data.edges.remove('temp2-edge');
    this.state.network.body.data.edges.remove('temp3-edge');
    this.state.network.body.data.edges.remove('temp4-edge');
    this.state.network.body.data.nodes.remove('temp1');
    this.state.network.body.data.nodes.remove('temp2');
    this.state.network.body.data.nodes.remove('temp3');
    this.state.network.body.data.nodes.remove('temp4');
  }

  onDeselectNode = (coords) => {
    let id = this.state.network.getNodeAt(coords);

    if (id === 'temp1' || id === 'temp2' || id === 'temp3' || id === 'temp4') {
      return;
    }
    else if(this.state.creationNodesEnabled){
      this.removeCreationNodes();
      this.setState({creationNodesEnabled: false});
    }
  }

  //UI functions--------------------------->
  //Add new Node to selected one
  addNode = (creationNodeId) => {
    let newId = this.state.counter + 1,
        parentId = this.state.network.getConnectedNodes(creationNodeId, 'from')[0],
        parentCoords =   this.state.network.getPositions(parentId),
        parentX = parentCoords[parentId].x,
        parentY = parentCoords[parentId].y,
        parentLength = this.state.network.canvas.body.nodes[parentId].labelModule.size,
        newX = 0, newY = 0;

    if (creationNodeId==='temp1'){
      newX = parentX;
      newY = parentY - parentLength.height - 80;
    }
    if (creationNodeId==='temp2'){
      newX = parentX + parentLength.width + 80;
      newY = parentY;
    }
    if (creationNodeId==='temp3'){
      newX = parentX;
      newY = parentY + parentLength.height + 80;
    }
    if (creationNodeId==='temp4'){
      newX = parentX - parentLength.width - 80;
      newY = parentY;
    }

    this.setState({counter: newId})

    this.state.network.body.data.nodes.add({
      id: newId, 
      label: 'New Element',
      color:{
        background: '#319CFF',
        border: '#000000'
      },
      font:{
          align: 'center',
          bold: true,
          color: '#000000',
          face: 'Roboto-Light',  
          multi: true,
          size: 20
      },
      margin: { 
          top: 10, 
          bottom: 10, 
          right: 15,       
          left: 15 }, 
      x: newX, 
      y: newY
    });
    this.state.network.body.data.edges.add({from: parentId, to: newId});
  }

  getScale = () => {
    console.log(this.state.network.getScale());
  }

  closeEditForm = () => {
    this.setState({editNodeMode: false});
  }

  //Render function--------------------------->

  render() {
    let classEditForm = ["map-edit-form-container"];
    if (this.state.editNodeMode){
      classEditForm.push('--show');
    }

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

        <div className={classEditForm.join(' ')}>
          <form className='map-edit-form'>

            <div className='map-edit-form__label-container'>
              <div className='map-edit-form__icon'></div>
              <div className='map-edit-form__title'>Edit Node</div>
            </div>

            <div className='map-edit-form__body-container'>
              <div className='map-edit-form__input-wrapper'>
                <input className='map-edit-form__input' type="text" placeholder=' ' required/>
                <label>Label</label>
              </div>
            </div>

            <div className='map-edit-form__buttons-container'>
              <div className='map-edit-form__button' >save</div>
              <div className='map-edit-form__button' onClick={this.closeEditForm}>cancel</div>
            </div>
          </form>
        </div>

      </>
    );
  }
}

export default MindMap;