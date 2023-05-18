const express = require('express');
const router = express.Router();
const entryCtrl = require('../controllers/entries')

module.exports = router

router.get('/', entryCtrl.index)
router.get('/personal', entryCtrl.personal)
router.get('/new', entryCtrl.newEntry)
router.post('/', entryCtrl.createEntry)

router.get('/:id', entryCtrl.show)
router.get('/:id/edit', entryCtrl.updateButton)
router.put('/:id', entryCtrl.update)
router.delete('/:id', entryCtrl.deleteEntry)




// const express = require('express');
// const router = express.Router();
// const entryCtrl = require('../controllers/entries')
// const isLoggedIn = require("../config/auth")

// module.exports = router

// router.get('/', entryCtrl.index)
// router.get('/personal', isLoggedIn, entryCtrl.personal)
// router.get('/new',  isLoggedIn, entryCtrl.newEntry)
// router.post('/',  isLoggedIn, entryCtrl.createEntry)

// router.get('/:id', entryCtrl.show)
// router.get('/:id/edit',  isLoggedIn, entryCtrl.updateButton)
// router.put('/:id',  isLoggedIn, entryCtrl.update)
// router.delete('/:id', isLoggedIn, entryCtrl.deleteEntry)