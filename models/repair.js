const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repairSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },  // replace with house id?
  title: { type: String, required: true },
  category: { type: String },
  startDate: { type: Schema.Types.ObjectId, ref: 'Bid' },   // Look up "saving refs" in the Mongoose docs.
  endDate: { type: Schema.Types.ObjectId, ref: 'Bid' },
  status: { type: String },                                 // MAKE THIS A LIST (DROPDOWN)
  date: { type: Date, default: Date.now },
//  scope: { type: Schema.Types.ObjectId, ref: 'Bid'  },    // PDF?
});

const Repair = mongoose.model("Repair", repairSchema);

module.exports = Repair;
