import React, { Component, Fragment } from 'react';

import EditorJs from 'react-editor-js';

class TextEditor extends Component{
  constructor(props) {
      super(props);
      
      this.state = {
        data: {
          blocks: [
            {
              type: "paragraph",
              data: {
                text:
                  "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
              }
            }
          ]
        }
      };
  
      
  }

  componentDidMount() {
    this.editorInstance // access editor-js
  }
  
  render() {

    return (
      <div className='text-editor__wrapper'>
        <div className='text-editor__body'>
          <EditorJs instanceRef={instance => this.editorInstance = instance} data={this.state.data} />
        </div>        
      </div>
    );
  }
}

export default TextEditor;