const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comments");

router.post("/entries/:id/comments", commentCtrl.createComment);
// router.get('/:id/comments', commentCtrl.showComments)
// router.delete('/comments/:id/', commentCtrl.deleteComment)

module.exports = router