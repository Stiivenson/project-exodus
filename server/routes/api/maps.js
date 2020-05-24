const express = require('express');
const router = express.Router();
const {auth} = require('../../middleware/auth');

const Maps = require('../../models/Maps');
const User = require('../../models/User');


/**
   * @route POST api/map/create
   * @desc  Create new map
   * @acces Private
   */
router.post('/create', auth, (req, res) => {

    // Create Map with root Node
    const newMap = new Maps({
        owner_id: req.body.owner,
        title: req.body.title,
        nodes: [
            {
                id: 'root',
                label: req.body.title
            }
        ],
        edges: [],
        DocTreeStructure: []
    });

    newMap.save()
        .then(async function (map) {
            // Add Map id to User, then send res
            await User.updateOne({ _id: map.owner_id }, { $push: { PrivateMaps: map.id } });
            res.json({
                _id: map.id,
                title: map.title
            });            
        })
        .catch(err => res.status(404).json({success: false}));
}); 

    
/**
   * @route POST api/map/update
   * @desc  Update map
   * @acces Private
   */
router.post('/update', auth, (req, res) => {
   
});


/**
   * @route DELETE api/map/:id
   * @desc  Delete map
   * @acces Private
   */
router.delete('/:id', auth, (req, res) => {
   Maps.findById(req.params.id)
    .then(map => map.remove())
    .then(async function () {
        await User.updateOne({ _id: req.user.id }, { $pull: { PrivateMaps: req.params.id } });
        res.json({success: true});           
    })
    .catch(err => res.status(404).json({success: false}));
    
});

module.exports = router;