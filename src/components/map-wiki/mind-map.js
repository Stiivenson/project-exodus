import React, { Component} from 'react';
import Graph from "react-graph-vis";
import { MapSelectionBar } from './map-ui-selection-bar';

class MindMap extends Component {  
  constructor(props) {
    super(props);
    
    let initialGraph = {};
    initialGraph.nodes = this.props.map_component.nodes;
    initialGraph.edges = this.props.map_component.edges;

    let manipulationOptions = {
        enabled: false,
        initiallyActive: false,
        addNode: (data, callback) => {
          let newId = this.state.counter + 1

          data.id = newId;  
          data.label = 'New Node'
          data.color = {
            background: '#319CFF',
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
          // this.setState({editNodeMode: true});
          this.state.network.addNodeMode();
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
    this.props.map_component.options.manipulation = manipulationOptions;

    this.state = {
      graph: initialGraph,
      options: this.props.map_component.options,
      style: { width: "100%", height: "100%" },
      network: null,
      
      counter: 1,
      selectedNode: 1,

      editNodeMode: false,
      editNodeId: null,
      editNodeLabel: '',

      deleteNodeMode: false,

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
  }

  onDoubleClick = (e) => {
    if(!this.state.editNodeMode){
      let id = this.state.selectedNode,
          label = this.state.network.body.nodes[id].options.label;
      
      this.setState({editNodeMode: true, editNodeLabel: label});
    }
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


  onDeselectNode = (coords) => {
    let id = this.state.network.getNodeAt(coords);
  }

  //UI functions--------------------------->
  getScale = () => {
    console.log(this.state.network.getScale());
  }

  closeEditForm = () => {
    this.setState({editNodeMode: false});
  }


  getSelectionBar = (atrr) => {
    let attribute = atrr;
    this.state.network

    switch(attribute){
            case 'cursor':
                this.state.network.disableEditMode();
                this.setState({deleteNodeMode: false});
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

  saveEditFormData = (e) => {
    e.preventDefault();

    let id = this.state.selectedNode;
    this.state.network.body.nodes[id].options.label = this.state.editNodeLabel; 
    this.setState({editNodeMode: false});
  }

  handleEditFormChange = (e) => {
    this.setState({editNodeLabel: event.target.value});
  }

  deleteNodeMode = (id) => {
    if(id !== 1){
      this.selectAllInternalNodes(id);
      this.state.network.deleteSelected();
    }    
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
        <MapSelectionBar getSelectionBar={this.getSelectionBar}/>     

        <div className={classEditForm.join(' ')}>
          <form className='map-edit-form' onSubmit={this.saveEditFormData}>

            <div className='map-edit-form__label-container'>
              <div className='map-edit-form__icon'></div>
              <div className='map-edit-form__title'>Edit Node</div>
            </div>

            <div className='map-edit-form__body-container'>
              <div className='map-edit-form__input-wrapper'>
                <input className='map-edit-form__input' type="text" value={this.state.editNodeLabel} onChange={this.handleEditFormChange}
                       placeholder=' ' required/>
                <label>Label</label>
              </div>
            </div>

            <div className='map-edit-form__buttons-container'>
              <button className='map-edit-form__button' type='submit'>save</button>
              <button className='map-edit-form__button' type='reset' onClick={this.closeEditForm}>cancel</button>
            </div>
          </form>
        </div>

      </>
    );
  }
}

export default MindMap;