const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeSchema = new Schema({

  userId: { type: String },
  // hasHomeProfile: { type: Boolean, default: true },
  hasHomeProfile: { type: Boolean },
  // hasZillow: { type: Boolean, default: true },
  hasZillow: { type: Boolean },
  streetAddress: { type: String },
  // zipCode: { type: String, required: true },
  city: { type: String },
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
});

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
