const Entry = require ('../models/entry');

module.exports = {
    newEntry
}

function newEntry(req, res) {
    res.render("entries/new", {title: "New Entry"})
}