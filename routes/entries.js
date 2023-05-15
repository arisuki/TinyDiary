const express = require('express');
const router = express.Router();
const entryCtrl = require('../controllers/entries.js')

module.exports = router

router.get('/', entryCtrl.index)
router.get('/new', entryCtrl.newEntry)
router.post('/', entryCtrl.createEntry)

router.get('/:id', entryCtrl.show)
router.delete('/:id', entryCtrl.deleteEntry)
router.get('/:id/edit', entryCtrl.updateButton)
router.put('/:id', entryCtrl.update)