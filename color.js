// define variables
let mongoose = require('mongoose');
let validator = require('validator');

// how to make the schema for the program
let colorSchema = new mongoose.Schema({
  game: Number,
  squares: Array,
  selected: String,
});

module.exports = mongoose.model("Color", colorSchema);
