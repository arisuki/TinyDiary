const express = require('express');
const router = express.Router();
const entryCtrl = require('../controllers/entries.js')

module.exports = router

// router.get('/', entryCtrl.index)
router.get('/new', entryCtrl.newEntry)