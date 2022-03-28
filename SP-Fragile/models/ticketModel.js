const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    trim: true, //to remove spacing in inverted commas and name
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  groupSize: {
    type: Number,
    default: 1,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  forDate: {
    type: Date,
    default: Date.now(), //booking date
  },
  usedOn: {
    type: Date,
  },
  purchasedOn: {
    type: Date,
  },
  usable: {
    type: Boolean,
    default: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  checkingAdminId: {
    type: String
  },
  otpCode: {
    type: String,
  },
  otpTime: {
    type: Date,
  },
  razorpay_payment_id: {
    type: String,
    unique: true,
  },
  razorpay_order_id: {
    type: String,
    unique: true,
  },
  razorpay_signature:{
    type: String,
    unique: true,    
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
