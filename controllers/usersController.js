const db = require("../models");

// Defining methods for the booksController
module.exports = {
  createUser: function(req, res) {
    db.User.find({ email: req.body.userToSave.email }).then(dbModel => {
      if (dbModel[0] === undefined) {
        db.User.create(req.body.userToSave)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      } else {
        res.json({ userExists: true });
      }
    });
  },

  findUser: function(req, res) {
    db.User.findById({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
