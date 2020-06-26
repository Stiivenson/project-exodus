const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    nodes: {
        type: Array
    },
    edges: {
        type: Array
    },
    DocTreeStructure: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
});

MapSchema.index({ title: 'text' });

module.exports = Maps = mongoose.model('map', MapSchema);