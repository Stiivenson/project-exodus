const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { auth } = require('../../middleware/auth');

const Promise = require('bluebird');

// Models
const User = require('../../models/User');
const Maps = require('../../models/Maps');


// Find User by provided id
const findUser = (id) => {
    return new Promise(function (resolve, reject) {
        User.findById(id).exec((err, user) => {
            if(err) reject('Error:', err);
            else {                     
                resolve(user);               
            }
        });
    });
}

// Find all Maps by provided ids array
function findMaps (arr) {
    return new Promise(function (resolve, reject) {
        let maps = new Array();
        if (arr.length > 0) {
            Maps.find().select('_id').select('title').where('_id').in(arr).exec((err, map) => {
                if(err) reject('Error:', err);
                else { 
                    resolve(map);               
                }
            });       
        }
        else resolve(maps);               
    });
}


/**
   * @route POST api/auth/register
   * @desc  Register new users
   * @acces Public
   */ 
router.post('/register', (req, res) => {

    const { name, email, password } = req.body;

    console.log(req.body);
    
    
    // Simple validation
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields!' });
    }

    //Check for existing user
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exists!' });

            const newUser = new User({
                name,
                email,
                password
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({ 
                                        token
                                     });
                                }
                            );
                            
                        });
                });
            });
        });
});


/**
   * @route POST api/auth/login
   * @desc  Authenticate user
   * @acces Private
   */ 
router.post('/login', (req, res) => {

    const { email, password } = req.body;
    
    // Simple validation
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields!' });
    }

    //Check for existing user
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User not exist!' });

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: '1d' },
                        (err, token) => {
                            if(err) throw err;
                            res.json({ 
                                token
                             });
                        }
                    );
                });
            
        })
});


router.get('/get/trash', auth, (req, res) => {
    
    async function getTrashMaps (id) {
        let user = findUser(id);

        let TrashMaps = user.then(function (user) {
            return findMaps(user.TrashMaps);  
        });

        await TrashMaps;

        res.json({
            trashMaps: TrashMaps.value()
        });
    }

    getTrashMaps(req.user.id);
});

/**
   * @route GET api/auth/user
   * @desc  Get user data
   * @acces Private
   */ 
router.get('/user', auth, (req, res) => {
    
    // Get User data & Maps ids, titles
    async function getAllUserData (id) {
        let user = findUser(id);

        let PrivateMaps = user.then(function (user) {
            return findMaps(user.PrivateMaps);  
        });

        let PublicMaps = user.then(function (user) {
            return findMaps(user.PublicMaps);  
        });

        let RecentMaps = user.then(function (user) {
            return findMaps(user.RecentMaps);  
        });

        let TrashMaps = user.then(function (user) {
            return findMaps(user.TrashMaps);  
        });

        await PrivateMaps;
        await PublicMaps;
        await RecentMaps;
        await TrashMaps;

        res.json({
            user: {
                id: user.value()._id,
                name: user.value().name,
                email: user.value().email
            },
            maps: {
                privateMaps: PrivateMaps.value(),
                publicMaps: PublicMaps.value(),
                recentMaps: RecentMaps.value(),
                trashMaps: TrashMaps.value()
            }
        });
    }

    getAllUserData(req.user.id);
});

module.exports = router;