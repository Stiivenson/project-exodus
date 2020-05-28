const { socketAuth } = require('../middleware/auth');

const async = require('async');

// Models
const User = require('../models/User');
const Maps = require('../models/Maps');


/**
   * @function getMapData / Get all data about Map for MapEditor
   */
function getMapData (id) {
    return new Promise(function (resolve, reject) {
        if (id) {
            Maps.findById(id).select('-date').select('-__v').exec((err, map) => {
                if(err) reject('Error:', err);
                else { 
                    resolve(map);               
                }
            });       
        }
        else throw('No id provided!');               
    });
}

/**
   * @function addNode / Add new Node & treeDataItem to Map
   */
  function addNode (id, data) {
    let treeDataItem = { id: data.id, label: data.label, treeData: [] }
    return new Promise(function (resolve, reject) {
        if (data && id) {
            Maps.update({ _id: id }, { $push: { nodes: data, DocTreeStructure: treeDataItem } }, {new: true}).exec((err, res) => {
                if(err) reject('Error:', err);
                else { 
                    resolve(res);               
                }
            });       
        }
        else throw('No data provided!');               
    });
}

/**
   * @function moveNode / Save need coords in DB after Node moved
   */
  function moveNode (id, positions) {
    return new Promise(function (resolve, reject) {
        if (positions && id) {
            async.eachSeries(positions, function updateObject (obj, done) {
                // Model.update(condition, doc, callback)
                Maps.updateMany({ "_id": id, "nodes.id": obj.id }, { $set : { "nodes.$.x": obj.coords.x, "nodes.$.y": obj.coords.y }}, done);
            }, function allDone (err) {
                // this will be called when all the updates are done or an error occurred during the iteration
                if (err) reject('Error:', err);
                else {
                    resolve('Success');
                }
            });      
        }
        else throw('No data provided!');               
    });
}

/**
   * @function updateNode / Update Node & treeDataItem in Map
   */
  function updateNode (id, data) {
    return new Promise(function (resolve, reject) {
        if (data && id) {
            Maps.update({ "_id": id, "nodes.id": data.id}, { $set: { "nodes.$.label": data.label } }).exec((err, res) => {
                if(err) reject('Error:', err);
                else { 
                    Maps.update({ "_id": id, "DocTreeStructure.id": data.id}, { $set: { "DocTreeStructure.$.label": data.label }}).exec((err, res) => {
                        if(err) reject('Error:', err);
                        else { 
                            resolve(res);  
                        }
                    });                                 
                }
            });       
        }
        else throw('No data provided!');               
    });
}

/**
   * @function deleteNode / Delete Nodes & treeDataItems from Map
   */
  function deleteNode (id, data) {
    return new Promise(function (resolve, reject) {
        if (id) {
            Maps.updateOne({ _id: id }, { $pull: { nodes: { id: { $in: data } }, DocTreeStructure:  { id: { $in: data } } } }).exec((err, res) => {
                if(err) throw(err); 
                else {                     
                    resolve(res);               
                }
            });       
        }
        else throw('No data provided!');               
    });
}

/**
   * @function addEdge / Add new Edge to Map
   */
  function addEdge (id, data) {
    return new Promise(function (resolve, reject) {
        if (data && id) {
            Maps.updateOne({ _id: id }, { $push: { edges: data} }, {new: true}).exec((err, res) => {
                if(err) reject('Error:', err);
                else { 
                    resolve(res);               
                }
            });       
        }
        else throw('No data provided!');               
    });
}

/**
   * @function deleteEdge / Delete Edges from Map
   */
  function deleteEdge (id, data) {
    return new Promise(function (resolve, reject) {
        if (id) {
            Maps.updateOne({ _id: id }, { $pull: { edges: { id: { $in: data }  } } }).exec((err, res) => {
                if(err) throw(err); 
                else {                     
                    resolve(res);               
                }
            });       
        }
        else throw('No data provided!');               
    });
}

/**
   * @function getDocTreeData / Get data for DocTree Component
   */
  function getDocTreeData (mapId, nodeId) {
      console.log(mapId, nodeId);
      let ID = []; ID.push(nodeId);
      
    return new Promise(function (resolve, reject) {
        if (mapId) {
            Maps.findOne({ _id: mapId}).select('-_id').select('DocTreeStructure').exec((err, res) => {
                if(err) reject(err);
                else {
                    res.DocTreeStructure.map(item => {
                        if(item.id === nodeId) resolve(item);
                    });        
                }
            });       
        }
        else throw('No id provided!');               
    });
}

/**
   * @function addFolder / Add new Folder to DocTree
   */
  function addFolder (mapId, nodeId, data) {
    return new Promise(function (resolve, reject) {
        if (data && nodeId) {
            Maps.update({ "_id": mapId, "DocTreeStructure.id": nodeId }, { $push: { 'DocTreeStructure.$.treeData': data } }).exec((err, res) => {
                if(err) reject('Error:', err);
                else {
                    resolve(res);               
                }
            });       
        }
        else throw('No data provided!');               
    });
}

module.exports = function(server) {

    // Connect socket to server
    const io = require('socket.io').listen(server).sockets;

    io
    .use(function(socket, next){
        // Check authentication
        socketAuth(socket, socket.handshake.query.token); 
        next();
    })
    .on('connection', function(socket) {
        console.log("Connected to Socket: "+ socket.id);
        
        socket.on('JOIN_ROOM', (id) => {
            const room = id;
            console.log('Joined room ', room);
            socket.join(room);
            socket.emit('Connected', room);
        });

        /**
         * @Section Handle Map-Editor actions
         */     
        socket.on('CLIENT:GET_MAP_DATA', (id) => {
            console.log('GET_MAP_DATA', id);
            
            getMapData(id)
            .then(res => socket.emit('SERVER:SEND_MAP_DATA', res))
            .catch(err => console.log(err));          
        });

        socket.on('CLIENT--MapEditor:CREATE_NODE', function(data){
            addNode(data.id, data.node)
            .then(() => socket.emit('SERVER--MapEditor:CREATE_NODE_SUCCESS', data.node ))
            .catch(() => socket.emit('SERVER:ERROR'));  
        });
        socket.on('CLIENT--MapEditor:MOVE_NODE', function(data){
            moveNode(data.id, data.positions)
            .then(() => socket.emit('SERVER--MapEditor:MOVE_NODE_SUCCESS', data.positions ))
            .catch(() => socket.emit('SERVER:ERROR'));  
        });
        socket.on('CLIENT--MapEditor:UPDATE_NODE', function(data){
            updateNode(data.id, data.node)
            .then(() => socket.emit('SERVER--MapEditor:UPDATE_NODE_SUCCESS', data.node ))
            .catch(() => socket.emit('SERVER:ERROR'));  
        });
        socket.on('CLIENT--MapEditor:DELETE_NODE', function(data){
            deleteNode(data.id, data.nodes)
            .then(() => socket.emit('SERVER--MapEditor:DELETE_NODE_SUCCESS', data.nodes))
            .catch(err => {console.log('Error:', err), socket.emit('SERVER:ERROR')});  
        });

        socket.on('CLIENT--MapEditor:CREATE_EDGE', function(data){
            addEdge(data.id, data.edge)
            .then(() => socket.emit('SERVER--MapEditor:CREATE_EDGE_SUCCESS', data.edge ))
            .catch(() => socket.emit('SERVER:ERROR'));  
        });
        socket.on('CLIENT--MapEditor:DELETE_EDGE', function(data){
            deleteEdge(data.id, data.edges)
            .then(() => socket.emit('SERVER--MapEditor:DELETE_EDGE_SUCCESS', data.edges))
            .catch(err => socket.emit('SERVER:ERROR'));  
        });

        socket.on('CLIENT--MapEditor:GET_DOCTREE_DATA', function(data){
            getDocTreeData(data.id, data.nodeId)
            .then((data) => socket.emit('SERVER--MapEditor:GET_DOCTREE_DATA_SUCCESS', data))
            .catch(err => {console.log('Error:', err), socket.emit('SERVER:ERROR')});  
        });

        /**
         * @Section Handle Doc-Tree actions
         */ 
        socket.on('CLIENT--DocTree:CREATE_FOLDER', function(data){
            addFolder(data.mapId, data.nodeId, data.folder)
            .then((data) => socket.emit('SERVER--DocTree:CREATE_FOLDER_SUCCESS', data))
            .catch(err => {console.log('Error:', err), socket.emit('SERVER:ERROR')});  
        });


        socket.on('disconnect', function(){
            console.log('Disconnected - '+ socket.id);
        });

        if(socket.error) {
            console.log(socket.error);
            socket.disconnect();
        }
        
    });
}