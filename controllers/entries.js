const Entry = require("../models/entry");

module.exports = {
  newEntry,
  index,
  createEntry,
  deleteEntry,
  show,
  updateButton,
};

function newEntry(req, res) {
  res.render("entries/new", { title: "New Entry" });
}

function createEntry(req, res, next) {
  req.body.user = req.user._id;
  Entry.create(req.body)
    .then(() => res.redirect("/entries"))
    .catch(next);
}

//shows everyone's art in one index
function index(req, res, next) {
  Entry.find({})
    .then((entries) => {
      res.render("entries/index", {
        entries,
        title: "All diary entries",
      });
    })
    .catch(next);
}

function deleteEntry(req, res, next) {
  Entry.findById(req.params.id)
    .then((entry) => {
      if (!entry.user.equals(req.user._id)) throw new Error("Unauthorized");
      return entry.deleteOne();
    })
    .then(() => res.redirect("/entries"))
    .catch(next);
}

function show(req, res, next) {
  Entry.findById(req.params.id)
    .then((entry) => {
      res.render("entries/show", { entry, title: entry.title });
    })
    .catch(next);
}

function updateButton(req, res, next) {
  Entry.findById(req.params.id).then((entry) => {
    res.render("entries/edit", { entry, title: entry.title });
  });
}

//personal index
// function index(req, res, next) {
//     Entry.findOne({user: req.user._id})
//         .then(entries => {
//             res.render('entries/index', {
//                 entries,
//                 title: "All diary entries"
//             })
//         })
//         .catch(next)
// }
