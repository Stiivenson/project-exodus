const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const NodeSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    root: {
        type: String,
        required: false
    }
});

module.exports = Node = mongoose.model('node', NodeSchema);