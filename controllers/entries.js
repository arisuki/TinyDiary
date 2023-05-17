const Entry = require("../models/entry");
const Comment = require("../models/comment");
const multer = require('multer');

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

  ///////////////////////////////////////////
  //multer stuff
  // const imgUpload = multer({
  //   dest:'./uploads/',
  //   rename: function (fieldname, filename){
  //     return filename.replace(/\W+/g, '-').toLowerCase();
  // }
  // }).single('image')
  ///////////////////////////////////////////
  console.log(req.body)
  Entry.create(req.body)
    .then(() => res.redirect("/entries"))
    .catch(next);
}
//first submit to cloudinary, get the string for it with console logs
//append req.body... whatever it is, with location of stored image

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
    .then(() => res.redirect("/entries/personal"))
    .catch(next);
}

// new function to show entries and comments
async function show(req, res, next) {
  try {
    const entry= await Entry.findById(req.params.id).populate("user")
    const comments= await Comment.find({entry: entry._id}).populate("user")
    console.log("////////////////////////")
    console.log("here is the entry:", entry)
    console.log("here are comments:", comments)
    console.log("////////////////////////")
    res.render("entries/show", { entry, comments, title: entry.title });
  } catch (err) {
    console.log(err)
    res.render("entries/show", { errorMsg: err.message })
  }
}
    //////////////// previous working function:


// function show(req, res, next) {
//   Entry.findById(req.params.id)
//     .populate("user")
//     .then((entry) => {
//       res.render("entries/show", { entry, title: entry.title, comments: 0});
//     })
//     .catch(next);
// }

// entry.users.name, etc to input it 

/////////////////////////function with showing entries
// function show(req, res, next) {
//   Entry.findById(req.params.id).populate("user")
//     .then((entry) => {
//       Comment.find({entry: entry.id}).populate("user")
//       })
//       .then((entry)=>{
//         res.render("entries/show", {entry, comments: Comment, title: entry.title });
//       })
//         .catch(next)
// }
/////////////////////////function with showing entries


// function show(req, res, next) {
//   const entry = Entry.findById(req.params.id)
//     .then(Comment.find({entry: entry._id}))
//     .then((entry) => {
//       res.render("entries/show", { entry, title: entry.title });
//     })
//     .catch(next);
// }

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

