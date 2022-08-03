const mongoose = require("mongoose");

const extrasSchema = {
  name: String,
  description: String,
  price:  Number,
  currency: String,
  imageURL: String
};

const Extras = mongoose.model("Extras", extrasSchema);

module.exports = Extras;
