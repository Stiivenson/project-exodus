import React, { Component} from 'react';

import { v4 as uuid } from 'uuid';
import SortableTree, { toggleExpandedForAll, getFlatDataFromTree, getTreeFromFlatData, changeNodeAtPath, removeNodeAtPath } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

class DndDocTree extends Component{
  constructor(props) {
      super(props);
      
      this.state = {
        isEmpty: false,
        isOpened: true, 
        treeData: [],
        rawData: [],

        contextIsOpened: false,
        menu: null
      };

      this.textInput = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
      if (state.rawData !== props.docTree.treeData ) {
        const generateTreeData = {
          tree: getTreeFromFlatData({
            flatData: props.docTree.treeData.map(node => ({ ...node, title: node.title })),
            getKey: node => node.id, // resolve a node's key
            getParentKey: node => node.parent, // resolve a node's parent's key
            rootKey: null, // The value of the parent key when there is no parent (i.e., at root level)
          }),
        };

        return { 
          rawData: props.docTree.treeData,
          treeData: generateTreeData.tree
        }
      }
      return null;
  }

  updateTreeData = (treeData) => {
    const flatData = getFlatDataFromTree({
      treeData: treeData,
      getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
      ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
    }).map(({ node, path }) => ({
      id: node.id,
      title: node.title,
      expanded: node.expanded,
      isDirectory: node.isDirectory,

      // The last entry in the path is this node's key
      // The second to last entry (accessed here) is the parent node's key
      parent: path.length > 1 ? path[path.length - 2] : null,
    }));

    console.log('flatData: ', flatData);  
    console.log('updateTreeData: ', treeData);
    let nodeId = this.props.docTree.id, mapId = this.props.mapId;
    this.props.socket.emit('CLIENT--DocTree:UPDATE_TREE_DATA', { mapId: mapId, nodeId: nodeId, flatData: flatData});
  }

  createNewFile = () => {
    //this.props.history.push('/text-editor')
    let nodeId = this.props.docTree.id, mapId = this.props.mapId;
    let folder = {
      id: uuid(),
      title: 'Новый файл',
      isDirectory: false,
      parent: null
    }
    this.props.socket.emit('CLIENT--DocTree:CREATE_FOLDER', { mapId: mapId, nodeId: nodeId, folder: folder});
  }

  createNewFolder = () => {
    let nodeId = this.props.docTree.id, mapId = this.props.mapId;
    let folder = {
      id: uuid(),
      title: 'Новая папка',
      isDirectory: true,
      parent: null
    }
    this.props.socket.emit('CLIENT--DocTree:CREATE_FOLDER', { mapId: mapId, nodeId: nodeId, folder: folder});
  }

  // Open / Hide all DocTree component
  openningDocTree = () => {
    this.props.openningDocTree();
  }

  
  // Toogle Context menu of DocTree items
  toogleContextMenu = (parent) => {
      // Check for recieved parent (pressed 'Menu' button)
      if(parent) {
        // If user pressed another btn, while Context menu is shown - return
        if (parent !== this.state.menu && this.state.menu !== null) return;
        else {
          // If no menu was selected - save in State and toogle Context menu
          if(this.state.menu === null) {
            parent.classList.toggle('--opened');
            this.setState({ menu: parent });
          } else {
            parent.classList.toggle('--opened');
          }
        }
      }
    
    if (!this.state.contextIsOpened) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
      // Clear menu in State
      this.state.menu.classList.toggle('--opened');
      this.setState({ menu: null });
    }

    this.setState(prevState => ({
       contextIsOpened: !prevState.contextIsOpened,
    }));
  }

  handleOutsideClick = (e) => {
    this.toogleContextMenu();
  }




  componentDidUpdate(prevProps, prevState) {
    if(this.textInput.current)
    console.log(this.textInput.current.focus());
    
  }
  


  render() {
    const { id, label } = this.props.docTree;
    const { isEmpty, isOpened } = this.props;
  
    //console.log('Get teeData from DB:', treeData);
      


    let SortableTreeClass = ["doc-tree-wrapper"];
    if (id && !isEmpty){
      SortableTreeClass.push('--not-empty');
    }
    if (isOpened){
      SortableTreeClass.push('--opened');
    }

    let SortableTreeContainerClass = {
      display: 'flex',
      flexFlow: 'column nowrap',
      flexBasis: '100%',
      padding: '20px 0 0 0'
    }
    let SortableTreeInnerContainerClass = {
      display: 'flex',
      flexFlow: 'column nowrap',
      flexBasis: '100%',
      outline: 'none'
    }

    const getNodeKey = ({ treeIndex }) => treeIndex;


    return (
      <div className={SortableTreeClass.join(' ')}>
      <div className='doc-tree-body'>
          <div className='doc-tree__title'>
            <h3>{label}</h3>
          </div>
          <SortableTree
            theme={FileExplorerTheme}
            treeData={this.state.treeData}
            onChange={this.updateTreeData}

            style={SortableTreeContainerClass}
            innerStyle={SortableTreeInnerContainerClass}
            className='sortable_tree__container'
            
            canDrag={({ node }) => !node.dragDisabled}
            canDrop={({ nextParent }) => !nextParent || nextParent.isDirectory}
            generateNodeProps={ ({ node, path }) => ({
              // icons: node.isDirectory
              //   ? [
              //       // <div
              //       //   style={{
              //       //     borderLeft: 'solid 8px gray',
              //       //     borderBottom: 'solid 10px gray',
              //       //     marginRight: 10,
              //       //     boxSizing: 'border-box',
              //       //     width: 16,
              //       //     height: 12,
              //       //     filter: rowInfo.node.expanded
              //       //       ? 'drop-shadow(1px 0 0 gray) drop-shadow(0 1px 0 gray) drop-shadow(0 -1px 0 gray) drop-shadow(-1px 0 0 gray)'
              //       //       : 'none',
              //       //     borderColor: rowInfo.node.expanded ? 'white' : 'gray',
              //       //   }}
              //       // />,
              //       <svg width="20" height="19" style={{ marginRight: 10}} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              //         <path d="M18.3333 10.2173V3.33336C18.3333 2.41418 17.5859 1.66668 16.6666 1.66668H8.9225L7.37789 0.12207C7.29977 0.0439453 7.19398 0 7.08328 0H1.66668C0.747461 0 0 0.7475 0 1.66668V13.3334C0 14.2525 0.747461 15 1.66668 15H11.011C11.557 16.9209 13.3232 18.3334 15.4167 18.3334C17.9439 18.3334 20 16.2773 20 13.75C20 12.3298 19.3506 11.0586 18.3333 10.2173ZM10.8545 14.1667H1.66668C1.2073 14.1667 0.833359 13.7927 0.833359 13.3334V1.66668C0.833359 1.2073 1.2073 0.833359 1.66668 0.833359H6.91082L8.45543 2.37797C8.53356 2.45609 8.63934 2.50004 8.75004 2.50004H16.6667C17.1261 2.50004 17.5 2.87398 17.5 3.33336V9.67266C16.8741 9.35156 16.1671 9.16668 15.4167 9.16668C12.8894 9.16668 10.8334 11.2227 10.8334 13.75C10.8333 13.8907 10.842 14.0293 10.8545 14.1667ZM15.4167 17.5C13.3488 17.5 11.6667 15.8179 11.6667 13.75C11.6667 11.6821 13.3488 10 15.4167 10C17.4845 10 19.1667 11.6821 19.1667 13.75C19.1667 15.8179 17.4845 17.5 15.4167 17.5Z" fill="black"/>
              //         <path d="M17.0833 13.3334H15.8333V12.0834C15.8333 11.8531 15.6469 11.6667 15.4166 11.6667C15.1863 11.6667 15 11.8531 15 12.0834V13.3334H13.75C13.5197 13.3334 13.3333 13.5198 13.3333 13.7501C13.3333 13.9804 13.5197 14.1668 13.75 14.1668H15V15.4168C15 15.6471 15.1864 15.8335 15.4167 15.8335C15.647 15.8335 15.8334 15.6471 15.8334 15.4168V14.1668H17.0834C17.3137 14.1668 17.5 13.9804 17.5 13.7501C17.5 13.5198 17.3136 13.3334 17.0833 13.3334Z" fill="black"/>
              //       </svg>
              //     ]
              //   : [
              //       <div
              //         style={{
              //           border: 'solid 1px black',
              //           fontSize: 8,
              //           textAlign: 'center',
              //           marginRight: 10,
              //           width: 12,
              //           height: 16,
              //         }}
              //       >
              //         F
              //       </div>,
              //     ],
              buttons: [
                  (node.isDirectory && !node.isInput) ? [
                  <div className='doc-tree__tools --folder' key={node.id}
                    onClick = { (e) => {
                      let icon = e.target.closest('.--folder');
                      icon.classList.toggle('--opened');

                      let parent = e.target.closest('.rstcustom__node');
                      let button = parent.querySelector('button');
                      if(button) button.click();                    
                    }}
                  >
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.353553" y1="0.646447" x2="5.35355" y2="5.64645" stroke="#319CFF"/>
                    <line x1="4.64645" y1="5.64645" x2="9.64645" y2="0.646447" stroke="#319CFF"/>
                    </svg>
                  </div>
                ] : [null],

                node.isInput ? [

                ] : [
                  <div className='doc-tree__tools --menu' key={node.id}
                  onClick={(e) => {
                    let parent = e.target.closest('.--menu');                    
                    this.toogleContextMenu(parent);
                  }}
                  > 
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.00001 2.22224C5.61366 2.22224 6.11113 1.72477 6.11113 1.11112C6.11113 0.497465 5.61366 0 5.00001 0C4.38635 0 3.88889 0.497465 3.88889 1.11112C3.88889 1.72477 4.38635 2.22224 5.00001 2.22224Z" fill="black" fillOpacity="0.7"/>
                      <path d="M5.00001 6.11116C5.61366 6.11116 6.11113 5.61369 6.11113 5.00004C6.11113 4.38638 5.61366 3.88892 5.00001 3.88892C4.38635 3.88892 3.88889 4.38638 3.88889 5.00004C3.88889 5.61369 4.38635 6.11116 5.00001 6.11116Z" fill="black" fillOpacity="0.7"/>
                      <path d="M5.00001 9.99993C5.61366 9.99993 6.11113 9.50247 6.11113 8.88882C6.11113 8.27517 5.61366 7.77771 5.00001 7.77771C4.38635 7.77771 3.88889 8.27517 3.88889 8.88882C3.88889 9.50247 4.38635 9.99993 5.00001 9.99993Z" fill="black" fillOpacity="0.7"/>
                    </svg>
                    { this.state.contextIsOpened ? 
                      <div className='context-menu'>
                        <ul>
                          <li
                            onClick={(e) => {
                                this.setState(state => ({
                                treeData: changeNodeAtPath({
                                  treeData: state.treeData,
                                  path,
                                  getNodeKey,
                                  newNode: { ...node, isInput: true }
                                })
                              }));                              
                            }}
                          >Изменить</li>
                          <li
                          onClick={() => {
                            const newTree = removeNodeAtPath({
                              treeData: this.state.treeData,
                              path,
                              getNodeKey: ({ treeIndex }) => treeIndex,
                            });
                            this.updateTreeData(newTree);                           
                          }}
                          >Удалить</li>
                        </ul>
                      </div>
                      : null
                    }                    
                  </div>
                ]
              ],
              title: [
                node.isInput ? [
                  <input
                    value={node.title}
                    key={node.id}
                    ref={this.textInput}
                    onBlur={() => {
                      this.setState(state => ({
                        treeData: changeNodeAtPath({
                          treeData: state.treeData,
                          path,
                          getNodeKey,
                          newNode: { ...node, isInput: false }
                        })
                      }));
                      this.updateTreeData(this.state.treeData);
                    }} 
                    onChange={event => {
                      const title = event.target.value;

                      this.setState(state => ({
                        treeData: changeNodeAtPath({
                          treeData: state.treeData,
                          path,
                          getNodeKey,
                          newNode: { ...node, title }
                        })
                      }));
                    }}
                  />
                ] : [node.title]
              ]        
            })}
          />
          <div className='doc-tree__buttons-wrapper'>
            <div className='top-border'/>
            <div className='doc-tree__buttons-container'>
              <button onClick={this.createNewFolder}>
                <div className='logo --folder'></div>
                Папка
              </button>
              <div className='buttons-separator'/>
              <button onClick={this.createNewFile}>
              <div className='logo --note'></div>
                Запись
              </button>
            </div>              
          </div>  
      </div>
      <button className='button_open-tree' onClick={this.openningDocTree}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
          <path d="M14.6093 7.15424L7.60505 0.150402C7.50508 0.0502745 7.38979 0 7.2595 0C7.12936 0 7.01423 0.0502745 6.91405 0.150402L6.16246 0.901887C6.06228 1.00207 6.01227 1.11715 6.01227 1.2476C6.01227 1.37805 6.06228 1.49312 6.16246 1.59331L12.0694 7.50011L6.16251 13.4071C6.06233 13.5072 6.01232 13.6225 6.01232 13.7526C6.01232 13.883 6.06233 13.9983 6.16251 14.0985L6.9141 14.8498C7.01423 14.95 7.12936 15 7.25955 15C7.39 15 7.50513 14.9499 7.60505 14.8498L14.6093 7.84587C14.7094 7.74574 14.7594 7.6304 14.7594 7.50016C14.7594 7.36992 14.7094 7.25463 14.6093 7.15424Z" fill="black"/>
          <path d="M8.9879 7.50016C8.9879 7.36992 8.93805 7.25458 8.8375 7.15424L1.83372 0.150402C1.73359 0.0502745 1.6183 0 1.48806 0C1.35782 0 1.24248 0.0502745 1.14235 0.150402L0.39092 0.901939C0.290581 1.00212 0.24057 1.1172 0.24057 1.24765C0.24057 1.3781 0.290581 1.49318 0.39092 1.59336L6.29772 7.50016L0.39092 13.4071C0.290581 13.5072 0.24057 13.6225 0.24057 13.7526C0.24057 13.883 0.290581 13.9983 0.39092 14.0985L1.1423 14.8498C1.24248 14.95 1.35777 15 1.48801 15C1.61825 15 1.73354 14.9499 1.83372 14.8498L8.8375 7.84587C8.93805 7.74574 8.9879 7.6304 8.9879 7.50016Z" fill="black"/>
          </g>
        </svg>  
      </button>     
      </div>
    );
  }
}

export default DndDocTree;