export default {
    PublicMaps: [
        
    ],
    PrivateMaps: [
        {
            "id": 1,
            "title": "React"
        },
        {
            "id": 2,
            "title": "Js"
        },
        {
            "id": 3,
            "title": "Web development"
        }
    ],
    MapOptions: {
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
}