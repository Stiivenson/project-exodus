import React, { Component} from 'react';
import { connect } from "react-redux";
import Graph from "react-graph-vis";
import { MapNavigationBar } from './MapNavigationBar';

const map_options = {
  layout: {
    randomSeed: undefined,
    improvedLayout:true,
    hierarchical:{
      enabled: false,            
    }
  },
  nodes:{
    shape:'box'
  },
  edges: {
    arrows: {
      to: {
        enabled: false,
        type: "arrow"
      },
      middle: {
        enabled: false
      },
      from: {
        enabled: false,
        type: "arrow"
      }
    },
    smooth: {
      type: "cubicBezier",
      forceDirection: "vertical",
      roundness: 0.5
    }
  },
  interaction:{
    dragNodes:true,
    dragView: true,
    hover: true,
    navigationButtons: true,
    multiselect: true
  },
  physics:{
    enabled: false
  },
  manipulation: {}
};

const root_node_options = {
  color:{
     background: '#ffffff',
     border: '#000000'
  },      
  font:{
      align: 'center',
      bold: true,
      color: '#000000',
      face: 'Roboto-Bold',    
      multi: true,  
      size: 26
  },
  margin: { 
      top: 20, 
      bottom: 15, 
      right: 20,       
      left: 20 
  },
  shapeProperties:{
    borderRadius: 20
  },
  fixed:{
    x: true,
    y: true
  },
  x: 0,
  y: 0            
}

const node_options = {
  color: {
    background: '#ffffff',
    border: '#000000'
  },
  font: {
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
    left: 15 
  }
}

const edge_options = {
  arrows: {
    to: {
      enabled: true
    }
  }
}

/**
 * @class MapEditor
 * @description Component to draw MindMap using vis.js
 * @initial_properties nodes / edges / options
 * 
 * @section_list
 *    @section Event-Funcs
 *    @section Listen-NavigationBar
 *    @section Map-EditForms 
 *    @section Assist-Funcs 
 *    @section Iinitial-Funcs 
 *    @section Render 
 *    @section ... 
 */

class MapEditor extends Component {  
  constructor(props) {
    super(props);

    let initialGraph = {};
    initialGraph.nodes = this.props.map.nodes;
    initialGraph.edges = this.props.map.edges;
    
    initialGraph.nodes.map(node => {
      if(node.id === 'root') node = Object.assign(node, root_node_options);
      else node = Object.assign(node, node_options);
    });

    initialGraph.edges.map(edge => {
      edge = Object.assign(edge, edge_options);
    });

    let manipulationOptions = {
        enabled: false,
        initiallyActive: false,
        addNode: (data, callback) => {
          data.label = 'Новый раздел';

          let serverData = {
            id: data.id,
            label: data.label,
            x: data.x,
            y: data.y
          }
          
          this.props.socket.emit('CLIENT--MapEditor:CREATE_NODE', { id: this.state.id, node: serverData });
          this.props.addNode(data);
          //this.setState({editNodeMode: true});
          this.state.network.addNodeMode();
        },
        addEdge: (data, callback) => {
          data.arrows = {
            to: {enabled: true}
          };
          if (data.from === data.to || data.to === 1) {
            return;
          } else {
            this.props.addEdge(data);
          }
          this.state.network.addEdgeMode();
        }
    };
    
    map_options.manipulation = manipulationOptions;

    this.state = {
      id: props.map.id,
      graph: initialGraph,
      options: map_options,
      style: { width: "100%", height: "100%" },
      network: null,
      
      selectedNode: 1,        //remember id of selected node

      editNodeMode: false,    //show/hide EditNodeForm
      editNodeLabel: '',

      deleteNodeMode: false,

      EDIT_MODE: false,
      scale: 0,
      onHover: false
    };

    this.events = {
      click:        (event) => this.onClick(event.pointer.DOM),
      doubleClick:  (event) => this.onDoubleClick(event),
      hold:         (event) => this.onHold(event.pointer.DOM),
      dragStart:    (event) => this.onDragStart(event.pointer.DOM),
      dragEnd:      (event) => this.onDragEnd(event.pointer.DOM),
      dragging:     (event) => this.onDragging(event.pointer.DOM),
      blurNode:     (event) => this.onBlurNode(event),
      hoverNode:    (event) => this.onHoverNode(event),
      selectNode:   (event) => this.onSelectNode(event.nodes[0]),
      deselectNode: (event) => this.onDeselectNode(event.pointer.DOM)
    }
  }

  /**
   * @section Event-Funcs
   * @description Funcs triger after Map events fired
   * 
   * @event click         => @function onClick @EMPTY
   * @event doubleClick   => @function onDoubleClick / turn on editNodeMode
   * @event hold          => @function onHold / send node id => @designation show DndDocTree with provided id
   *                                    @body  @props recieveNodeForTree(id)
   * @event dragStart     => @function onDragStart / drag selected node and all its childs
   *                                    @body  getNodeAt(coords) =>  @function selectAllInternalNodes()
   * 
   * @event dragging      => @function onDragging @EMPTY
   * @event blurNode      => @function onBlurNode @EMPTY
   * @event hoverNode     => @function onHoverNode @EMPTY
   * @event selectNode    => @function onSelectNode   /select node at pointer and remember its id, 
   *                                                  also check if(deleteNodeMode) deleteNode()
   * @event deselectNode  => @function onDeselectNode @EMPTY
   * 
   */

  onClick = (coords) => {
    //let node = this.state.network.getNodeAt(coords);
  }

  onDoubleClick = (e) => {
    if(!this.state.editNodeMode){
      let id = this.state.selectedNode,
          label = this.state.network.body.nodes[id].options.label;
      
      this.setState({editNodeMode: true, editNodeLabel: label});
    }
  }

  onHold= (coords) => {
    let id = this.state.network.getNodeAt(coords);
    console.log(id);
    
    this.props.socket.emit('CLIENT--MapEditor:GET_DOCTREE_DATA', { id: this.state.id, nodeId: id });
    
  }

  onDragStart = (coords) => {
    let selectedNode = this.state.network.getNodeAt(coords);
    this.selectAllInternalNodes(selectedNode);
  }

  onDragging = (e) => {
  }

  onDragEnd = (coords) => {
    let selectedNodes = this.state.network.getSelectedNodes();
    let positions = this.state.network.getPositions(selectedNodes);
    let idArr = Object.keys(positions);
    let coordArr = Object.values(positions);
    let positionArr = []
    idArr.map((id, i) => {
      let node = {
        id: id,
        coords: {
          x: coordArr[i].x,
          y: coordArr[i].y
        }
      };
      positionArr.push(node);
    })
    console.log(positionArr);
    this.props.socket.emit('CLIENT--MapEditor:MOVE_NODE', { id: this.state.id, positions: positionArr });
  }

  onHoverNode = (e) => {
    //let DOMcoord = e.pointer.DOM;
  }

  onBlurNode = (e) => {
    //let DOMcoord = e.pointer.DOM;
  }

  onSelectNode = (id) => {
    if(id){  
      if(this.state.deleteNodeMode){
        this.deleteNodeMode(id);
        return;
      }
      this.setState({selectedNode: id});     
    }
  }

  onDeselectNode = (coords) => {
    //let id = this.state.network.getNodeAt(coords);
  }

  /**
   * @section Listen-NavigationBar
   * @description Listen events from NavigationBar and trigger Modes
   * 
   * @function listenNavigationBar / Listen events from NavigationBar and trigger Modes
   * @mode addNodeMode / addEdgeMode / deleteNodeMode provided by vis.js
   * 
   * @function deleteNodeMode / delete node by id, except Root
   */

  listenNavigationBar = (atrr) => {
    let attribute = atrr;
    this.setState({deleteNodeMode: false});
    switch(attribute){
        case 'cursor':
            this.state.network.disableEditMode();
            break;
        case 'node':
            this.state.network.addNodeMode();
            break;
        case 'edge':
            this.state.network.addEdgeMode();
            break;
        case 'delete':
            this.setState({deleteNodeMode: true});
            break;
        default:
            return;
    }
  }


  deleteNodeMode = (id) => {
    if(id !== 'root'){
      this.selectAllInternalNodes(id);
      let dataToDelete = this.state.network.getSelection(); // Get all selected nodes & edges
      this.props.deleteDataFromMap(dataToDelete);
    }    
  }

  /**
   * @section Map-EditForms
   * @description Funcs responsible for edit nodes/edges abilities
   * 
   * @function handleNodeEditFormChange / keep state.editNodeLabel renewed
   * @function saveNodeEditForm         / save and update node id 
   * @function closeNodeEditForm        /close form and trun off editNodeMode
   */


  handleNodeEditFormChange = (e) => {
    this.setState({editNodeLabel: event.target.value});
  }
  
  saveNodeEditForm = (e) => {
    e.preventDefault();
    
    let updatedNode = {
      id: this.state.selectedNode,
      label: this.state.editNodeLabel
    }
    this.props.editNode(updatedNode);
    this.props.socket.emit('CLIENT--MapEditor:UPDATE_NODE', { id: this.state.id, node: updatedNode }); 
    this.setState({editNodeMode: false});
  }

  closeNodeEditForm = () => {
    this.setState({editNodeMode: false});
  }


  /**
   * @section Assist-Funcs
   * @description Funcs provide additional abilities
   * 
   * @function selectAllInternalNodes / select all node's childs
   *           @involved_in dragStart / deleteNodeMode
   * @function moveNodeAnim / node animation from one point to another
   */

  selectAllInternalNodes = (selectedNode) => {
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


  /**
   * @section Iinitial-Funcs
   * @description Funcs to generate initial state and track Component's state
   * 
   * @function ...
   */

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

  componentDidUpdate(){
    let network =  this.state.network.body.data;
    let value =  this.props.handlerValue, data = this.props.handlerData;

    // console.log('value ', this.props.handlerValue);
    // console.log('data ', this.props.handlerData);
    // console.log('network ', this.state.network);    

    switch(value) {
      case 'add-node': {
        let newNode = data;        
        newNode = Object.assign(newNode, node_options);  
        network.nodes.add(newNode);
        return this.props.handlerClear();
      }

      case 'add-edge': {
        let newEdge = data;
        let node = network.nodes._data[data.from];
        let oldEdges = this.state.network.getConnectedEdges(node.id);

        network.edges.add(newEdge);

        let newEdges = this.state.network.getConnectedEdges(node.id);
        newEdges.map(edge => {
          if(!oldEdges.includes(edge)) {
            let edgeData = network.edges._data[edge];
            console.log(edgeData);
            
            let serverData = {
              id: edgeData.id,
              from: edgeData.from,
              to: edgeData.to
            }
            this.props.socket.emit('CLIENT--MapEditor:CREATE_EDGE', { id: this.state.id, edge: serverData });  
          }     
        });        
        
        return this.props.handlerClear();
      }

      case 'edit-node': {;
        network.nodes.update({id: data.id, label: data.label})
        return this.props.handlerClear();
      }

      case 'delete': {
        let nodes = data.nodes, edges = data.edges;

        if(edges.length > 0) {
          edges.map(edge => {
            network.edges.remove(edge);
          });  
        }
        if(nodes.length > 0) {
          nodes.map(node => {
            network.nodes.remove(node);
          });  
        }
        return this.props.handlerClear(); 
      }
      default:
        return;
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener("resize", this.measure);
  }
  

  /**
   * @section Render
   * @description Just render the Component, check all render conditions here
   * 
   * @function ...
   */

  render() {
    let classEditForm = ["modal-container"];
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
        <MapNavigationBar listenNavigationBar={this.listenNavigationBar}/>     

        <div className={classEditForm.join(' ')}>
          <form className='form' onSubmit={this.saveNodeEditForm}>

            <div className='form__label-container'>
              <div className='form__label'>Изменение раздела</div>
            </div>

            <div className='form__body-container'>
              <div className='form__input-wrapper'>
                <input className='form__input' type="text" value={this.state.editNodeLabel} onChange={this.handleNodeEditFormChange}
                        placeholder=' ' required/>
                <label>Заголовок</label>
              </div>
            </div>

            <div className='form__buttons-container'>
              <button className='form__button' type='submit'>Сохранить</button>
              <button className='form__button --exit' type='reset' onClick={this.closeNodeEditForm}>Выход</button>
            </div>

          </form>
        </div>

      </>
    );
  }
}

export default MapEditor;