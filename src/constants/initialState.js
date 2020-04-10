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
        edges:[{}],
        options:{
            layout: {
              randomSeed: undefined,
              improvedLayout:true,
              hierarchical:{
                enabled: false,            
                levelSeparation: 100,
                nodeSpacing: 80,
                blockShifting: true,
                edgeMinimization: true,
                parentCentralization: true,
                direction: 'UD',
                sortMethod: 'directed'
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
            manipulation: {
              enabled: false,
              initiallyActive: false,
              addNode: (data, callback) => {
                let newId = this.state.counter + 1
                data.id = newId;       
                this.setState({counter: newId})
                console.log(data); 
    
                console.log(this.state.network.body.data);
                let from_id = this.state.selectedNode;    
                callback(data);
              },
              addEdge: (data, callback) => {
                console.log('addEdge');
                
              }
            },
            physics:{
              enabled: false
            }
        }
    }    
}