const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Document.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Document.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    // console.log("getting here", req.body);
    db.Document.create(req.body.docDetail)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Document.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Document.findOneAndDelete({ userId: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // findProfile: function(req, res) {
  //   const string = req.params.id.toString();
  //   db.Document.find({ userId: string })
  //     .then(dbModel => {
  //       res.json(dbModel);
  //     })
  //     .catch(err => res.status(422).json(err));
  // },
};
