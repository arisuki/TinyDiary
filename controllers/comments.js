const Entry = require("../models/entry");
const Comment = require("../models/comment");

module.exports = {
  createComment,
};

function createComment(req, res, next) {
  req.body.user = req.user._id;
  req.body.entry = req.params.id;
  Entry.findById(req.params.id)
    .then(Comment.create(req.body))
    .then(() => res.redirect(`/entries/${req.params.id}`))
    .catch(next);
}
