const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is must"],
  },
  username:{
    type: String,
    required: true,
    unique:true
  },

  hash: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
    required: true,
  }
});
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
