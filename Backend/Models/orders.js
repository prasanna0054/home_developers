const mongoose = require("mongoose");

const orderSchema = {
  userId: String,
  productsInfo: [{productId:String, productType:String}],
  paymentToken:String,
  paymentDate:Date,
  totalAmount: Number
};

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;
