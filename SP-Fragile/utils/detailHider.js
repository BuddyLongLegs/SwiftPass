const dehash = require("../utils/math").dehash;
const encrypt = require("../utils/math").encrypt;

function hideTicket(ticket) {
  // list of sensitive information:
  //  1. Email
  //  2. OTP Code  -> Not in use currently
  //  3. OTP Time  -> Not in use currently
  //  4. razorpay_payment_id
  //  5. razorpay_order_id
  //  6. razorpay_signature

  // It also hashes code to hashedID -> currently not using

  // if(ticket.code){
  //     ticket.code = encrypt(dehash(ticket.code));
  // }

  if (ticket.email) {
    let hidden = "";
    for (i = 0; i < ticket.email.length; i++) {
      if (i > 2 && i < ticket.email.indexOf("@")) {
        hidden += "*";
      } else {
        hidden += ticket.email[i];
      }
    }
    ticket.email = hidden;
  }
  if (ticket.otpCode) {
    ticket.otpCode = null;
  }

  if (ticket.otpTime) {
    ticket.otpTime = null;
  }

  if (ticket.razorpay_payment_id) {
    ticket.razorpay_payment_id = null;
  }

  if (ticket.razorpay_order_id) {
    ticket.razorpay_order_id = null;
  }

  if (ticket.razorpay_signature) {
    ticket.razorpay_signature = null;
  }


  return ticket;
}
module.exports.hideTicket = hideTicket;
