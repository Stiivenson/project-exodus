const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Node = require('./Map-Nodes');

// Create Schema
const MapSchema = new Schema({
    owner_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    nodes: [Node.schema],
    edges: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
});



module.exports = Maps = mongoose.model('map', MapSchema);