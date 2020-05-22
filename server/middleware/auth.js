const config = require('config');
const jwt = require('jsonwebtoken');

// Check token from Client
function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token
    if(!token) return res.status(401).json({ msg: 'No token, auth denied!' });

    try {
        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Add user from payload
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({ msg: 'Token is not valid!' });
    }
}

// Check token from Client in socket
function socketAuth(socket, token) {
    const socketToken = token;    
    socket.error = null
    
    // Check for token
    if(!socketToken) return socket.error = 'No token, auth denied!';

    try {
        // Verify token
        const decoded = jwt.verify(socketToken, config.get('jwtSecret'));
        // Add user from payload
        return socket.user = decoded.id;        
    } catch(e) {
        return socket.error = 'Token is not valid!';
    }
}


module.exports = {
    auth: auth,
    socketAuth: socketAuth
};