import React, { Component, Fragment } from 'react';

import EditorJs from 'react-editor-js';

import io from "socket.io-client";
let socketTxt;
class TextEditor extends Component{
  constructor(props) {
      super(props);
      
      this.state = {
        id: null,
        title: '',
        data: {
          blocks: []
        } 
      };
  
      this.editorInstance = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if(state.id !== props.document.id) {
      if(socketTxt)socketTxt.disconnect();      
      socketTxt = io.connect("http://localhost:5000", {query: {token: props.token}});
      socketTxt.on('connect', () => {
        console.log('try to join room');
        socketTxt.emit('JOIN_ROOM', props.document.id);
      });

      socketTxt.on('Connected', (room) => {
        console.log('Connected to room', room);
      });

      console.log('new socket: ',socketTxt);  

      console.log('новые блоки: ', props.document.docBody);
      
      return {
        id: props.document.id,
        title: props.document.title,
        data: {
          blocks: props.document.docBody
        }
      }
    } else if (state.data.blocks !== props.document.docBody ) {
      return { 
        data: {
          blocks: props.document.docBody
        }
      }
    }
    return null;
}

  componentDidUpdate() {
    console.log('current socket: ',socketTxt); 
  }

  componentDidMount() {
    this.editorInstance // access editor-js    
  }

  handleSave = () => {
    this.editorInstance.current.save().
    then((outputData) => {
      console.log('Article data: ', outputData)
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
  }
  componentWillUnmount() {
    socketTxt.disconnect();
  }
  
  render() {

    return (
      <div className='text-editor__wrapper'>
        <div className='text-editor__body'>
          <h1>{this.state.title}</h1>
          <EditorJs 
            instanceRef={instance => this.editorInstance.current = instance}
            data={this.state.data} 
            onChange={this.handleSave}
            enableReInitialize={true}
          />
        </div>      
      </div>
    );
  }
}

export default TextEditor;