const Entry = require ('../models/entry');

module.exports = {
    newEntry,
    index,
    create,
}

function newEntry(req, res) {
    res.render("entries/new", {title: "New Entry"})
}

function create(req, res, next){
    req.body.user = req.user._id
    Entry.create(req.body)
    .then(() => res.redirect('/entries'))
    .catch(next)
}

//shows everyone's art in one index
function index(req, res, next) {
    Entry.find({})
        .then(entries => {
            res.render('entries/index', {
                entries,
                title: "All diary entries"
            })
        })
        .catch(next)
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

