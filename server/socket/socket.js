const { socketAuth } = require('../middleware/auth');

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
        console.log("User id:", socket.user);
        
        socket.on('CLIENT:GET_MAP_DATA', (id) => {
            getMapData(id)
            .then(res => socket.emit('SERVER:SEND_MAP_DATA', res))
            .catch(err => console.log(err));          
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