export default {
    map_component:{
        nodes:[
            {
                id: 1,
                label: 'MindProject',
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
        ],
        edges:[],
        options:{
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
            }
        }
    },
    dnd_doc_tree_component:{
      nodeId: null,
      title: '',
      treeData: [],
      doc_tree_structure:[
        {
          id:2,
          title:'Web Project',
          treeData: [
            { title: '.gitignore' },
            { title: 'package.json' },
            {
            title: 'src',
            isDirectory: true,
            expanded: true,
            children: [
                { title: 'styles.css' },
                { title: 'index.js' },
                { title: 'reducers.js' },
                { title: 'actions.js' },
                { title: 'utils.js' },
            ],
            },
            {
            title: 'tmp',
            isDirectory: true,
            children: [
                { title: '12214124-log' },
                { title: 'drag-disabled-file', dragDisabled: true },
            ],
            },
            {
            title: 'build',
            isDirectory: true,
            children: [{ title: 'react-sortable-tree.js' }],
            },
            {
            title: 'public',
            isDirectory: true,
            },
            {
            title: 'node_modules',
            isDirectory: true,
            },
            { title: '.gitignore' },
            { title: 'package.json' },
            {
            title: 'src',
            isDirectory: true,
            expanded: true,
            children: [
                { title: 'styles.css' },
                { title: 'index.js' },
                { title: 'reducers.js' },
                { title: 'actions.js' },
                { title: 'utils.js' },
            ],
            },
            {
            title: 'tmp',
            isDirectory: true,
            children: [
                { title: '12214124-log' },
                { title: 'drag-disabled-file', dragDisabled: true },
            ],
            },
            {
            title: 'build',
            isDirectory: true,
            children: [{ title: 'react-sortable-tree.js' }],
            },
            {
            title: 'public',
            isDirectory: true,
            },
            {
            title: 'node_modules',
            isDirectory: true,
            },
            { title: '.gitignore' },
            { title: 'package.json' },
            {
            title: 'src',
            isDirectory: true,
            expanded: true,
            children: [
                { title: 'styles.css' },
                { title: 'index.js' },
                { title: 'reducers.js' },
                { title: 'actions.js' },
                { title: 'utils.js' },
            ],
            },
            {
            title: 'tmp',
            isDirectory: true,
            children: [
                { title: '12214124-log' },
                { title: 'drag-disabled-file', dragDisabled: true },
            ],
            },
            {
            title: 'build',
            isDirectory: true,
            children: [{ title: 'react-sortable-tree.js' }],
            },
            {
            title: 'public',
            isDirectory: true,
            },
            {
            title: 'node_modules',
            isDirectory: true,
            },
            { title: '.gitignore' },
            { title: 'package.json' },
            {
            title: 'src',
            isDirectory: true,
            expanded: true,
            children: [
                { title: 'styles.css' },
                { title: 'index.js' },
                { title: 'reducers.js' },
                { title: 'actions.js' },
                { title: 'utils.js' },
            ],
            },
            {
            title: 'tmp',
            isDirectory: true,
            children: [
                { title: '12214124-log' },
                { title: 'drag-disabled-file', dragDisabled: true },
            ],
            },
            {
            title: 'build',
            isDirectory: true,
            children: [{ title: 'react-sortable-tree.js' }],
            },
            {
            title: 'public',
            isDirectory: true,
            },
            {
            title: 'node_modules',
            isDirectory: true,
            }
          ]
        },
        {
          id:3,
          title:'Films',
          treeData: [
            { title: 'Anime' },
            { title: 'XXX' }
          ]
        }
      ]
    }
}