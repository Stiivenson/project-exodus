const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DocSchema = new Schema({
    owner_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mapReference: {
        type: String,
        required: true
    },
    nodeReference: {
        type: String,
        required: true
    },
    DocBody: {
        type: Array
    }
});



module.exports = Docs = mongoose.model('doc', DocSchema);