const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repairSchema = new Schema({
  // userId: { type: String },
  home: { type: mongoose.Schema.Types.ObjectId, ref: "Home" },
  repairType: { type: String },
  title: { type: String },
  cost: { type: Number },
  priority: { type: String },
  status: { type: String },
  recurrencePeriod: { type: String },
  startDate: { type: Date },
  recurrenceStartDate: { type: Date },
  recurrenceEndDate: { type: Date },
  repeatInterval: { type: Number },
  repeatDayOfWeek: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  //  startTime: { type: Date, default: Date.now },
  //  endTime: { type: Date, default: Date.now },
  vendor: { type: String },
  notes: { type: String },
  duration: { type: String },
  date: { type: Date, default: Date.now },
  //  scope: { type: Schema.Types.ObjectId, ref: 'Bid'  },    // PDF?
});

const Repair = mongoose.model("Repair", repairSchema);

module.exports = Repair;
