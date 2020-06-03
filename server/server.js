const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('config');
const multer  = require("multer");
var cors = require('cors');


const app = express();
const server = require('http').createServer(app);

// Routes
const auth = require('./routes/api/auth');
const maps = require('./routes/api/maps');


// Bodyparser middleware
app.use(express.json());

// DB Config 
const db = config.get('mongoURI');

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, versionKey: false})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


app.use(cors());


console.log('dirname', __dirname);

app.use(express.static('public'));
//app.use(express.static(__dirname + './public'));

const imageStorage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: imageStorage
}).single('image');



app.post("/uploadFile", cors(),  (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.send("Error while uploading: ", err);
        } else {        
        res.send({
            "success" : 1,
            "file": {
                "url" : `http://localhost:5000/uploads/${req.file.filename}`,
                // ... and any additional fields you want to store, such as width, height, color, extension, etc
            }
        });
        }
    });  
});

// Use routes
app.use('/api/auth', auth);
app.use('/api/map', maps);

// Add sockets to server
require('./socket/socket')(server);


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started on port ${port}`));