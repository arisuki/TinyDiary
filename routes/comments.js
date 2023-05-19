const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comments");

router.post("/entries/:id/comments", commentCtrl.createComment);

module.exports = router