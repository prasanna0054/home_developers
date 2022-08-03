const mongoose = require("mongoose");

const newUserSchema = {
    newEmail: {type: String, required: true, unique:true},
    newPassword: {type: String, required: true},
    confirmPassword: {type: String, required: true},
    fName: {type: String, required: true},
    lName: {type: String, required: true},
    role: {type: String, required: true }
  };
  
  const NewUser = mongoose.model("NewUser", newUserSchema);

  
  module.exports = NewUser;