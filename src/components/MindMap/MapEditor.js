import React, { Component} from 'react';
import { connect } from "react-redux";
import Graph from "react-graph-vis";
import { MapNavigationBar } from './MapNavigationBar';


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
 *    @section External-Funcs 
 *    @section Iinitial-Funcs 
 *    @section Render 
 *    @section ... 
 */

class MapEditor extends Component {  
  constructor(props) {
    super(props);

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
        //background: '#319CFF',
         background: '#ffffff',
         border: '#000000'
      },
      fixed:{
          x: true,
          y: true
      },
      font:{
          align: 'center',
          bold: true,
          color: '#000000',
          face: 'Roboto-Regular',    
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
      }             
    }

    this.props.map.nodes[0] = Object.assign(this.props.map.nodes[0], root_node_options);
    
    let initialGraph = {};
    initialGraph.nodes = this.props.map.nodes;
    initialGraph.edges = this.props.map.edges;

    let manipulationOptions = {
        enabled: false,
        initiallyActive: false,
        addNode: (data, callback) => {
          let newId = this.state.counter + 1

          data.id = newId;  
          data.label = 'New Node'
          data.color = {
            background: '#ffffff',
            border: '#000000'
          };
          data.font = {
            align: 'center',
            bold: true,
            color: '#000000',
            face: 'Roboto-Light',  
            multi: true,
            size: 20
          };
          data.margin = { 
            top: 10, 
            bottom: 10, 
            right: 15,       
            left: 15 
          };
          
          this.setState({counter: newId})
          callback(data);
          //this.sendCreatedNode(data);
          //this.setState({editNodeMode: true});
          //this.state.network.addNodeMode();
        },
        addEdge: (data, callback) => {
          data.arrows = {
            to: {enabled: true}
          };
          if (data.from === data.to || data.to === 1) {
            return;
          } else {
            callback(data);
          }
          this.state.network.addEdgeMode();
        }
    };
    
    map_options.manipulation = manipulationOptions;

    this.state = {
      graph: initialGraph,
      options: map_options,
      style: { width: "100%", height: "100%" },
      network: null,
      
      counter: 1,             //generate new node's ids
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
    //let id = this.state.network.getNodeAt(coords); 
  }

  onDoubleClick = (e) => {
    if(!this.state.editNodeMode){
      let id = this.state.selectedNode,
          label = this.state.network.body.nodes[id].options.label;
      
      this.setState({editNodeMode: true, editNodeLabel: label});
    }
  }

  onHold= (coords) => {
    console.log(coords);
    let id = this.state.network.getNodeAt(coords);
    //this.props.recieveNodeForTree(id)
  }

  onDragStart = (coords) => {
    let selectedNode = this.state.network.getNodeAt(coords);
    this.selectAllInternalNodes(selectedNode);
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
    if(id !== 1){
      this.selectAllInternalNodes(id);
      this.state.network.deleteSelected();
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

    let id = this.state.selectedNode;
    this.state.network.body.nodes[id].options.label = this.state.editNodeLabel; 
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
   * @section External-Funcs
   * @description Funcs send data to ParentComponent
   * 
   * @function sendNodeData / send node id and label
   */

  sendCreatedNode = (data) => {
    //this.props.recieveCreatedNode(data);
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
        <MapNavigationBar listenNavigationBar={this.listenNavigationBar}/>     

        <div className={classEditForm.join(' ')}>
          <form className='map-edit-form' onSubmit={this.saveNodeEditForm}>

            <div className='map-edit-form__label-container'>
              <div className='map-edit-form__icon'></div>
              <div className='map-edit-form__title'>Edit Node</div>
            </div>

            <div className='map-edit-form__body-container'>
              <div className='map-edit-form__input-wrapper'>
                <input className='map-edit-form__input' type="text" value={this.state.editNodeLabel} onChange={this.handleNodeEditFormChange}
                       placeholder=' ' required/>
                <label>Label</label>
              </div>
            </div>

            <div className='map-edit-form__buttons-container'>
              <button className='map-edit-form__button' type='submit'>save</button>
              <button className='map-edit-form__button' type='reset' onClick={this.closeNodeEditForm}>cancel</button>
            </div>
          </form>
        </div>

      </>
    );
  }
}

export default MapEditor;