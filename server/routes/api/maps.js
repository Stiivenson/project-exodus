const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Maps = require('../../models/Maps');
const User = require('../../models/User');

// @route   Post api/map/create
// @desc    Create new map
// @access  Private
router.post('/create', auth, (req, res) => {
    const newMap = new Maps({
        owner_id: req.body.owner,
        title: req.body.title,
        nodes: [
            {
                label: req.body.title,
                root: 'root'
            }
        ],
        edges: []
    });

    newMap.save()
        .then(async function (map) {
            await User.updateOne({ _id: map.owner_id }, { $push: { PrivateMaps: map.id } });
            res.json({
                _id: map.id,
                title: map.title
            });            
        })
        .catch(err => res.status(404).json({success: false}));
});  
    
// @route   Post api/map/update
// @desc    Update map
// @access  Private
router.post('/update', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item => res.json(item));
});

// @route   Post api/map/delete
// @desc    Delete map
// @access  Private
router.delete('/:id', auth, (req, res) => {  
   Maps.findById(req.params.id)
    .then(map => map.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;