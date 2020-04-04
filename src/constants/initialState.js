export default {
    map_component:{
        nodes:[
            {
                id: 1,
                label: 'Web',
                chosen: false,
                color:{
                    background: '#319CFF',
                    border: '#000000'
                },
                fixed:{
                    x: true,
                    y: true
                },
                font:{
                    align: 'center',
                    bold: true,
                    color: '#ffffff',
                    face: 'arial',      
                    size: 26
                },
                margin: { 
                    top: 15, 
                    bottom: 15, 
                    right: 20,       
                    left: 20 },
                x: 0,
                y: 0
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
              navigationButtons: true,
              multiselect: true
            },
            manipulation: {
              enabled: true,
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