const dehash = require("../utils/math").dehash;
const encrypt = require("../utils/math").encrypt;

function hideTicket(ticket) {
  // list of sensitive information:
  //  1. Email
  //  2. OTP Code  -> Not in use currently
  //  3. OTP Time  -> Not in use currently

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
    delete ticket.otpCode;
  }

  if (ticket.otpTime) {
    delete ticket.otpTime;
  }

  if (ticket.otpTime) {
    ticket.otpTime = null;
  }

  return ticket;
}
module.exports.hideTicket = hideTicket;
