const router = require("express").Router();
const auth = require("./auth");
const events = require("./events");
const zillow = require("./zillow");
const home = require("./home");

// Home Routes
router.use("/auth", auth);
router.use("/events", events);
// router.use("/repairs", repairs);
router.use("/home", home);
router.use("/zillow", zillow);

module.exports = router;
