const Entry = require("../models/entry");
const Comment = require("../models/comment");

module.exports = {
  createComment,
  // deleteComment
};


// async function createComment(req, res) {
//   req.body.user = req.user._id;
//   req.body.entry = req.params.id;
//   try {
//     await Comment.create(req.body);
//     res.redirect(`/entries/${req.params.id}`);
//   } catch (err) {
//     res.send(err);
//   }
// }

// //this was working before new show
function createComment(req, res, next) {
  console.log(req.body);
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  Entry.findById(req.params.id)
    .then(Comment.create(req.body))
    .then(() => res.redirect(`/entries/${req.params.id}`))
    .catch(next);
}



// function deleteComment(req,res, next){
//     Entry.findOne({'comments._id': req.params.id, 'comments.user': req.user._id})
//     .then((entry) => {
//       if (!entry.comments.user.equals(req.user._id)) throw new Error("Unauthorized");
//       return entry.comments.remove(req.params.id)
//     })
//     .then(() => res.redirect(`/entries/${entry._id}`))
//     .catch(next);
// }


//   const Entry = require("../models/entry");

// module.exports = {
//   createComment,
//   // deleteComment
// }

// // async function createComment(req, res) {
// //   const entry = await Entry.findById(req.params.id);
// //   req.body.user = req.user._id;
// //   req.body.userName = req.user.name;
// //   req.body.userAvatar = req.user.avatar;
// //   entry.comments.push(req.body)
// //     try {await entry.save()
// //     } catch (err){
// //         console.log(err)
// //     }
// //     res.redirect(`/entries/${req.params.id}`)
// // }

// function createComment(req, res) {
//     req.body.user = req.user._id;
//     req.body.userName = req.user.name;
//     req.body.userAvatar = req.user.avatar;
//     Comment.create(req.body)
//     .then(()=>{
//         res.redirect(`/entries/${req.params.id}`)
//         })
//     .catch((err)=>{
//         res.send(err)
//     })
//     }

// // function deleteComment(req,res, next){
// //     Entry.findOne({'comments._id': req.params.id, 'comments.user': req.user._id})
// //     .then((entry) => {
// //       if (!entry.comments.user.equals(req.user._id)) throw new Error("Unauthorized");
// //       return entry.comments.remove(req.params.id)
// //     })
// //     .then(() => res.redirect(`/entries/${entry._id}`))
// //     .catch(next);
// // }
