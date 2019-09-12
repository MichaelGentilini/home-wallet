const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeSchema = new Schema({
  userId: { type: String },
  hasHomeProfile: { type: Boolean },
  hasZillow: { type: Boolean },
  streetAddress: { type: String },
  yearBuilt: { type: String },
  bedrooms: { type: String },
  bathrooms: { type: String },
  gla: { type: String },
  lotSize: { type: String },
  taxAssessment: { type: String },
  taxYear: { type: String },
  zestimate: { type: String },
  zestimateHigh: { type: String },
  zestimateLow: { type: String },
  zillowLink: { type: String },
  hasFence: { type: Boolean, default: false },
  hasPool: { type: Boolean, default: false },
  parking: { type: String },
  date: { type: Date, default: Date.now },
  documents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
});

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
