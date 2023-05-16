const Entry = require("../models/entry");

module.exports = {
  newEntry,
  index,
  createEntry,
  deleteEntry,
  show,
  updateButton,
  update,
  personal,
};

function newEntry(req, res) {
   res.render("entries/new", { title: "new_diary_entry.txt" })
}

function createEntry(req, res, next) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
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
        title: "all_diary_entries.txt",
      });
    })
    .catch(next);
}

//shows only YOUR art
function personal(req, res, next) {
    Entry.find({user: req.user._id})
        .then(entries => {
            res.render('entries/personal', {
                entries,
                title: "my_diary_entries.txt"
            })
        })
        .catch(next)
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


function update(req, res, next){
    Entry.findById(req.params.id)
        .then((entry) => {
            if (!entry.user.equals(req.user._id)) throw new Error('Unauthorized')
            return entry.updateOne(req.body)
        })
        .then(() => res.redirect(`/entries/${req.params.id}`))
        .catch(next)

    }

