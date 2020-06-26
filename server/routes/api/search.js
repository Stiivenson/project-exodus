const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth');

const Maps = require('../../models/Maps');
const User = require('../../models/User');
const Docs = require('../../models/Docs');

/**
   * @route GET /api/search/maps
   * @desc  Find all User maps
   * @acces Private
   */
router.get('/maps', auth, (req, res) => {
    const text = req.query.text;
    if(text === ''){
        res.json([]);  
    } else {
        User.findById({ _id: req.user.id }).exec((err, user) => {
            if(err) err => res.status(404).json({ msg: err });
            else {
                const PrivateMaps = user.PrivateMaps, PublicMaps = user.PublicMaps;
                const maps = PrivateMaps.concat(PublicMaps);
                Maps.find({ _id: { $in: maps },  title: { $regex: new RegExp(text), $options: 'i' } }).select('title').limit(10).exec((err, result) => {
                    if(err) err => res.status(404).json({ msg: err });
                    else {
                        res.json(result);   
                    }
                });              
            }
        });    
    }
});

/**
   * @route GET /api/search/docs/g
   * @desc  Find all User docs
   * @acces Private
   */
  router.get('/docs/g', auth, (req, res) => {
    const text = req.query.text;
    if(text === ''){
        res.json([]);  
    } else {
        Docs.find({ owner_id: { $eq: req.user.id  },  title: { $regex: new RegExp(text), $options: 'i' } }).select('title').limit(10).exec((err, result) => {
            if(err) err => res.status(404).json({ msg: err });
            else {
                res.json(result);   
            }
        });           
    }
});

/**
   * @route GET /api/search/doc/data
   * @desc  Get Document data
   * @acces Private
   */
  router.get('/doc/data', auth, (req, res) => {
    Docs.findOne({ _id: req.query.id}).select('-__v').exec((err, result) => {
        if(err) err => res.status(404).json({ msg: err });
            else {
                res.json(result);   
            }
    });       
});

module.exports = router;