import React, { Component} from 'react';

import { v4 as uuid } from 'uuid';
import SortableTree, { toggleExpandedForAll, getFlatDataFromTree, getTreeFromFlatData } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

class DndDocTree extends Component{
  constructor(props) {
      super(props);
      
      this.state = {
        isEmpty: false, 

        treeData2: [
          { id:1, title: 'Chicken', children: [{ id:2,title: 'Egg' }] },
          { id:3,title: 'Food', isDirectory:true, children: [] },
          { id:4,title: 'Meat', isDirectory:true, children: [] }
        ],
        treeData: [],
        flatData: [
          {id: 1, title: "Chicken", parent: null},
          {id: 2, title: "Egg", parent: 1},
          {id: 4, title: "Meat", parent: null,  isDirectory:true},
          {id: 3, title: "Food", parent: 4,  isDirectory:true}
        ],

        searchString: '',
        searchFocusIndex: 0,
        searchFoundCount: null
      };

      

  
      this.updateTreeData = this.updateTreeData.bind(this);
      this.expandAll = this.expandAll.bind(this);
      this.collapseAll = this.collapseAll.bind(this);
  }



  // static getDerivedStateFromProps(props, state) {
  //     if (state.nodeId !== props.nodeId ) {
  //         return { 
  //           Id: props.nodeId,
  //           title: props.title,
  //           treeData: props.treeData,
  //           isEmpty: true
  //         }
  //     }
  //     return null;
  // }
    
  updateTreeData(treeData) {

    const flatData = getFlatDataFromTree({
      treeData: treeData,
      getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
      ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
    }).map(({ node, path }) => ({
      id: node.id,
      title: node.title,

      // The last entry in the path is this node's key
      // The second to last entry (accessed here) is the parent node's key
      parent: path.length > 1 ? path[path.length - 2] : null,
    }));

    console.log('flatData: ', flatData);    
    console.log('treeData: ', treeData);  
    this.setState({ treeData });
  }

  expand(expanded) {
    console.log('expand');
    
    this.setState({
      treeData: toggleExpandedForAll({
        treeData: this.state.treeData,
        expanded
      })
    });
  }

  expandAll() {
    this.expand(true);
  }

  collapseAll() {
    this.expand(false);
  }

  createNewFile = () => {
    //let id = this.props.treeData.id;
    this.props.history.push('/text-editor')
  }

  createNewFolder = () => {
    let nodeId = this.props.treeData.id, mapId = this.props.mapId;
    let folder = {
      id: uuid(),
      title: 'Новая папка',
      isDirectory: true,
      children: []
    }
    this.props.socket.emit('CLIENT--DocTree:CREATE_FOLDER', { mapId: mapId, nodeId: nodeId, folder: folder});
  }

  componentDidMount() {
    const DATA = {
      tree: getTreeFromFlatData({
        flatData: this.state.flatData.map(node => ({ ...node, title: node.title })),
        getKey: node => node.id, // resolve a node's key
        getParentKey: node => node.parent, // resolve a node's parent's key
        rootKey: null, // The value of the parent key when there is no parent (i.e., at root level)
      }),
    };

    console.log('getTreeFromFlatData: ',DATA.tree);
    this.setState({treeData: DATA.tree})
  }
  
  expandOne = (node) => {
    console.log(node);
    console.log(node.expanded);
    let data = this.state.treeData, expandNode = node;
    data.map(node => {
      if(node.id === expandNode.id) {
        if(node.expanded){
          node.expanded = false
        } else {
          node.expanded = true
        }
      }
    });
    this.setState({ treeData: data });
  }

  render() {
    const {
      searchString,
      searchFocusIndex,
      searchFoundCount,
    } = this.state;

    const { id, label, treeData } = this.props.treeData;
    const { isEmpty } = this.props.isEmpty;

    const alertNodeInfo = ({ node, path, treeIndex }) => {
      const objectString = Object.keys(node)
        .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
        .join(',\n   ');

      global.alert(
        'Info passed to the icon and button generators:\n\n' +
          `node: {\n   ${objectString}\n},\n` +
          `path: [${path.join(', ')}],\n` +
          `treeIndex: ${treeIndex}`
      );
    };

    const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFocusIndex + 1) % searchFoundCount
            : 0,
      });

    let SortableTreeClass = ["doc-tree-body"];
    if (id && !isEmpty){
      SortableTreeClass.push('--opened');
    }
    let SortableTreeContainerClass = {
      display: 'flex',
      flexFlow: 'column nowrap',
      flexBasis: '100%',
      overflow: 'hidden',
      padding: '20px 0 0 0'
    }
    let SortableTreeInnerContainerClass = {
      display: 'flex',
      flexFlow: 'column nowrap',
      flexBasis: '100%'
    }


    return (
      <div className={SortableTreeClass.join(' ')}>
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

            searchQuery={searchString}
            searchFocusOffset={searchFocusIndex}
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0,
              })
            }

            
            canDrag={({ node }) => !node.dragDisabled}
            canDrop={({ nextParent }) => !nextParent || nextParent.isDirectory}
            generateNodeProps={rowInfo => ({
              
              icons: rowInfo.node.isDirectory
                ? [
                    // <div
                    //   style={{
                    //     borderLeft: 'solid 8px gray',
                    //     borderBottom: 'solid 10px gray',
                    //     marginRight: 10,
                    //     boxSizing: 'border-box',
                    //     width: 16,
                    //     height: 12,
                    //     filter: rowInfo.node.expanded
                    //       ? 'drop-shadow(1px 0 0 gray) drop-shadow(0 1px 0 gray) drop-shadow(0 -1px 0 gray) drop-shadow(-1px 0 0 gray)'
                    //       : 'none',
                    //     borderColor: rowInfo.node.expanded ? 'white' : 'gray',
                    //   }}
                    // />,
                    <svg width="20" height="19" style={{ marginRight: 10}} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.3333 10.2173V3.33336C18.3333 2.41418 17.5859 1.66668 16.6666 1.66668H8.9225L7.37789 0.12207C7.29977 0.0439453 7.19398 0 7.08328 0H1.66668C0.747461 0 0 0.7475 0 1.66668V13.3334C0 14.2525 0.747461 15 1.66668 15H11.011C11.557 16.9209 13.3232 18.3334 15.4167 18.3334C17.9439 18.3334 20 16.2773 20 13.75C20 12.3298 19.3506 11.0586 18.3333 10.2173ZM10.8545 14.1667H1.66668C1.2073 14.1667 0.833359 13.7927 0.833359 13.3334V1.66668C0.833359 1.2073 1.2073 0.833359 1.66668 0.833359H6.91082L8.45543 2.37797C8.53356 2.45609 8.63934 2.50004 8.75004 2.50004H16.6667C17.1261 2.50004 17.5 2.87398 17.5 3.33336V9.67266C16.8741 9.35156 16.1671 9.16668 15.4167 9.16668C12.8894 9.16668 10.8334 11.2227 10.8334 13.75C10.8333 13.8907 10.842 14.0293 10.8545 14.1667ZM15.4167 17.5C13.3488 17.5 11.6667 15.8179 11.6667 13.75C11.6667 11.6821 13.3488 10 15.4167 10C17.4845 10 19.1667 11.6821 19.1667 13.75C19.1667 15.8179 17.4845 17.5 15.4167 17.5Z" fill="black"/>
                      <path d="M17.0833 13.3334H15.8333V12.0834C15.8333 11.8531 15.6469 11.6667 15.4166 11.6667C15.1863 11.6667 15 11.8531 15 12.0834V13.3334H13.75C13.5197 13.3334 13.3333 13.5198 13.3333 13.7501C13.3333 13.9804 13.5197 14.1668 13.75 14.1668H15V15.4168C15 15.6471 15.1864 15.8335 15.4167 15.8335C15.647 15.8335 15.8334 15.6471 15.8334 15.4168V14.1668H17.0834C17.3137 14.1668 17.5 13.9804 17.5 13.7501C17.5 13.5198 17.3136 13.3334 17.0833 13.3334Z" fill="black"/>
                    </svg>
                  ]
                : [
                    <div
                      style={{
                        border: 'solid 1px black',
                        fontSize: 8,
                        textAlign: 'center',
                        marginRight: 10,
                        width: 12,
                        height: 16,
                      }}
                    >
                      F
                    </div>,
                  ],
              buttons: rowInfo.node.isDirectory ? [
                // <button
                //   style={{
                //     padding: 0,
                //     borderRadius: '100%',
                //     backgroundColor: 'gray',
                //     color: 'white',
                //     width: 16,
                //     height: 16,
                //     border: 0,
                //     fontWeight: 100,
                //   }}
                //   onClick={() => alertNodeInfo(rowInfo)}
                // >
                //   i
                // </button>,
                <div className='folder-button'
                  style={{
                    cursor: 'pointer',
                    width: 25,
                    height: 20,
                    display: 'flex',
                    flexFlow: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onClick = { (e) => {
                    let icon = e.target.closest('.folder-button');
                    if(icon.classList.contains('opened')){
                      icon.classList.remove('opened');
                    } else icon.classList.add('opened');

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
              ] : []
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
    );
  }
}


//Search form
{/* <div style={{ flex: '0 0 auto', padding: '0 15px' }}>
<h3>File Explorer Theme</h3>
<button onClick={this.expandAll}>Expand All</button>
<button onClick={this.collapseAll}>Collapse All</button>
<form
style={{ display: 'inline-block' }}
onSubmit={event => {
    event.preventDefault();
}}
>
<title htmlFor="find-box">
    Search:&nbsp;
    <input
    id="find-box"
    type="text"
    value={searchString}
    onChange={event =>
        this.setState({ searchString: event.target.value })
    }
    />
</title>

<button
    type="button"
    disabled={!searchFoundCount}
    onClick={selectPrevMatch}
>
    &lt;
</button>

<button
    type="submit"
    disabled={!searchFoundCount}
    onClick={selectNextMatch}
>
    &gt;
</button>

<span>
    &nbsp;
    {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
    &nbsp;/&nbsp;
    {searchFoundCount || 0}
</span>
</form>
</div> */}

export default DndDocTree;