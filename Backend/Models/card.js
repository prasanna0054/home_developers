const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const cardSchema = {
  title: String,
  propertyId:{type: Schema.Types.ObjectId, ref: 'Property', required: true},
  type:  String,
  imageURL: String,
  price : Number
};

const Cards = mongoose.model("Cards", cardSchema);

module.exports = Cards;