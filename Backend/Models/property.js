const mongoose = require("mongoose");
const PropertySchema = {
  about: String,
  description: String,
  price: Number,
  imageURL: String,
  imageURL1: String,
  imageURL2: String,
  imageURL3: String,
  imageURL4: String,
  imageURL5: String,
};

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
