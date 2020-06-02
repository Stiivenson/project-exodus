import React, { Component, Fragment } from 'react';

import { v4 as uuid } from 'uuid';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from "../../../constants/txtEditorTools";

import io from "socket.io-client";
let socketTxt;
let timerTxt;
class TextEditor extends Component{
  constructor(props) {
      super(props);
      
      this.state = {
        id: null,
        title: '',
        data: {
          blocks: []
        },
        enableReInitialize: true
      };
  
      this.editorInstance = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if(state.id !== props.document.id) {
      if(socketTxt) socketTxt.disconnect();

      socketTxt = io.connect("http://localhost:5000", {query: {token: props.token}});
      socketTxt.on('connect', () => {
        console.log('try to join room');
        socketTxt.emit('JOIN_ROOM', props.document.id);
      });

      socketTxt.on('Connected', (room) => {
        console.log('Connected to room', room);
      });

      socketTxt.on('SERVER--TextEditor:SAVE_NEW_DATA_SUCCESS', (data) => {
        console.log('SAVE_NEW_DATA_SUCCESS', data); 
        props.saveNewData(data);
      });

      return {
        id: props.document.id,
        title: props.document.title,
        data: {
          blocks: props.document.docBody
        },
        enableReInitialize: true
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
  }

  componentDidMount() {
    this.editorInstance // access editor-js    
  }

  Render = () => {
    if(editorInstance.current)
      console.log(editorInstance.current);
  }

  handleServerSave = (outputData) => {
    if (timerTxt) {		// проверка наличия таймера
      clearTimeout(timerTxt);	// сброс таймера, если он уже работает
      console.log('reset');
    } else {
        console.log('start');
    }

    timerTxt = setTimeout(() => {
      socketTxt.emit('CLIENT--TextEditor:SAVE_NEW_DATA', { id: this.state.id, data: outputData.blocks } );
    }, 3500);
  }

  handleSave = () => {
    if(this.state.enableReInitialize) this.setState({ enableReInitialize: false });

    this.editorInstance.current.save().
    then((outputData) => {
      this.handleServerSave(outputData);
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
  }

  rerender = () => {
    this.setState({ enableReInitialize: true })
  }

  componentWillUnmount() {
    socketTxt.disconnect();
  }
  
  render() {
    return (
      <div className='text-editor__wrapper'>
        <div className='text-editor__body'>
          <h1 className='text-editor__title'>{this.state.title}</h1>
          <EditorJs 
            instanceRef={instance => this.editorInstance.current = instance}
            data={this.state.data} 
            placeholder={'Введите данные'}
            onChange={this.handleSave}
            enableReInitialize={this.state.enableReInitialize}
            tools={EDITOR_JS_TOOLS}
          />        
        </div>      
      </div>
    );
  }
}

export default TextEditor;