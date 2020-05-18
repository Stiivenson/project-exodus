const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

// Bodyparser middleware
app.use(express.json());

// DB Config 
const db = config.get('mongoURI');

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


// Use routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
