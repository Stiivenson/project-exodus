const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const auth = require('./routes/api/auth');
const maps = require('./routes/api/maps');

const app = express();

// Bodyparser middleware
app.use(express.json());

// DB Config 
const db = config.get('mongoURI');

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, versionKey: false})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


// Use routes
app.use('/api/auth', auth);
app.use('/api/map', maps);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
