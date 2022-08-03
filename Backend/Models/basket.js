const mongoose = require("mongoose");

const basketSchema = {
  userId: String,
  productId: String, // choice // extra // property,
  productType: String,
  quantity: Number,
};

const Basket = mongoose.model("Basket", basketSchema);

module.exports = Basket;
