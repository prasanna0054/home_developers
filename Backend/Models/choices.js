const mongoose = require("mongoose");

const choicesSchema = {
  name: String,
  description:  String,
  imageURL: String
};

const Choices = mongoose.model("Choices", choicesSchema);

module.exports = Choices;
