import React, { Component} from 'react';

import { v4 as uuid } from 'uuid';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

class DndDocTree extends Component{
  constructor(props) {
      super(props);
      
      this.state = {
        isEmpty: false,

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
    this.setState({ treeData });
  }

  expand(expanded) {
    this.setState({
      treeData: toggleExpandedForAll({
        treeData: this.state.treeData,
        expanded,
      }),
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
          <h3>{label}</h3>
          <SortableTree
            theme={FileExplorerTheme}
            treeData={treeData}
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
                    <div
                      style={{
                        borderLeft: 'solid 8px gray',
                        borderBottom: 'solid 10px gray',
                        marginRight: 10,
                        boxSizing: 'border-box',
                        width: 16,
                        height: 12,
                        filter: rowInfo.node.expanded
                          ? 'drop-shadow(1px 0 0 gray) drop-shadow(0 1px 0 gray) drop-shadow(0 -1px 0 gray) drop-shadow(-1px 0 0 gray)'
                          : 'none',
                        borderColor: rowInfo.node.expanded ? 'white' : 'gray',
                      }}
                    />,
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
              buttons: [
                <button
                  style={{
                    padding: 0,
                    borderRadius: '100%',
                    backgroundColor: 'gray',
                    color: 'white',
                    width: 16,
                    height: 16,
                    border: 0,
                    fontWeight: 100,
                  }}
                  onClick={() => alertNodeInfo(rowInfo)}
                >
                  i
                </button>,
              ],
            })}
          />
          <div className='doc-tree__buttons-wrapper'>
            <div className='doc-tree__buttons-container'>
              <button onClick={this.createNewFolder}>
                <div className='logo --folder'></div>
                Папка
              </button>
              <button onClick={this.createNewFile}>Запись</button>
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