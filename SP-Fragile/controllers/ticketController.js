const Ticket = require("../models/ticketModel");
const notify = require("../utils/email").notify;
const {
  hash,
  dehash,
  getRandomCode,
  validPassword,
  genPassword,
  encrypt,
  decrypt,
} = require("../utils/math");
const hideTicket = require("../utils/detailHider").hideTicket;

// TODO: send email whenever a change occur to the ticket including link to ticket, sending email functionality will be added in ../utils/email.js

// Good Practice: Before sending ticket as response in res.json(), do this -> res.json({data: hideTicket(ticket)});

const newTicket = async (ticket) => {
  try {
    let code = "";
    let notFound = true;
    while (notFound) {
      code = hash(getRandomCode());
      const check = await Ticket.exists({ code: code });
      if (!check) {
        break;
      }
    }
    let fdate = new Date(ticket.forDate);
    let newTick = new Ticket({
      code: code,
      amount: 100, //later it will be according to number of people // paisa
      name: ticket.name,
      groupSize: ticket.groupSize,
      forDate: fdate,
      email: ticket.email,
    });

    await newTick.save();
    // notify(newTick.email, "new Ticket Created", "Ticket created");
    return newTick;
  } catch (err) {
    console.log(err);
    return null;
  }
};



const checkTicket = async (req, res) => {
  // should we add a functionality to check wether date of ticketUsage is same as mentioned in ticket?? it is possible easily

  // When email sending is available, otp-checking should be added here
  try {
    let ticket = await Ticket.findOne({ code: req.body.code }).exec();
    if (!ticket) {
      return res.status(404).json({
        status: "fail",
        message: `Ticket not found`,
      }); // ticket not found
    }
    if (!ticket.paid) {
      return res.status(402).json({
        status: "fail",
        message: `Payment required`,
      }); // payment required
    }
    if (!ticket.usable) {
      return res.status(400).json({
        status: "fail",
        message: `Ticket already used`,
      }); // ticket already used
    }
    if (ticket.usable) {
      if (ticket.email == req.body.email) {
        ticket.usable = false;
        ticket.usedOn = Date.now();
        ticket.checkingAdminId = req.user.username; // have doubt if it will work or not
        await ticket.save();
        return res.status(202).json({
          status: "success",
          message: `Ticket acccepted`,
          data: hideTicket(ticket),
        }); // ticket accepted, data: code, groupSize, forDate, checkedOn, usable, purchasedOn
      } else {
        return res.status(401).json({
          status: "error",
          message: `Wrong Details`,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      error: `Error Checking Ticket: ${err.message}`,
    });
  }
};


const delTicket = async (req, res) => {
  // can add a function that will refund if ticket is unused [Future Use]...
  try {
    let code = hash(decrypt(req.params.hashedID));
    let ticket = await Ticket.findOne({ code: code }).exec();
    if (!ticket) {
      return res.status(404).json({
        status: "fail",
        message: `Ticket already deleted`,
      }); // ticket already deleted
    }
    await ticket.remove();
    return res.status(200).json({
      status: "ok",
      message: `Ticket deleted successfully`,
    }); // ticket deleted successfully, data: code,
  } catch (err) {
    console.log("Error Deleting Ticket");
    return res.status(500).json({
      status: 500,
      error: `Error Deleting Ticket: ${err.message}`,
    });
  }
};

// current plan -> check ticket without OTP
const genOtp = async (req, res) => {
  // can add a functionality to check whether user inputted email is same as the one saved in database to remove spam
  try {
    let ticket = await Ticket.findOne({ code: req.body.code }).exec();
    if (!ticket) {
      return res.status(404).json({
        status: "fail",
        message: `Ticket does not exist`,
      }); // ticket does not exist
    }
    let code = hash(getRandomCode());
    while (code == ticket.otpCode) {
      code = hash(getRandomCode());
    }
    ticket.otpCode = code;
    ticket.otpTime = Date.now();
    await ticket.save();

    //email the OTP

    return res.status(201).json({
      status: "success",
      message: `OTP generated successfully`,
      data: {},
    }); // otp generated successfully, dekh lena kya kya details bhejni hai  //name,amount,groupSize,forDate bhej skte
  } catch (err) {
    console.log("Error generating OTP");
    return res.status(500).json({
      status: 500,
      error: `Error generating OTP: ${err.message}`,
    });
  }
};

// code to hashedID => hashedID = encrypt(dehash(code));
// hashedID to code => code = hash(decrypt(hashedID));
//  route .../<route>/:hashedID
const getTicket = async (req, res) => {
  try {
    let code = hash(decrypt(req.params.hashedID));
    let ticket = await Ticket.findOne({ code: code }).exec();
    if (!ticket) {
      return res.status(404).json({
        status: "fail",
        message: `Ticket does not exist`,
      }); // ticket does not exist
    }
    return res.status(200).json({
      status: "ok",
      data: hideTicket(ticket),
    });
  } catch (err) {
    console.log("Error getting Ticket");
    return res.status(500).json({
      status: 500,
      error: `Error getting Ticket: ${err.message}`,
    });
  }
};

//getALlTickets
// protoype function, features to be added in future->
//  1. pagination
//  2. Latest First
//  3. Only non-used/used
//  4. Only non-paid/paid
const getAllTickets = async (req, res) => {
  try {
    let tickets = await Ticket.find();
    if (!tickets) {
      return res.status(404).json({
        status: "fail",
        message: `No Tickets Found`,
      }); // no tickets found
    }
    const hiddenTickets = tickets.map(hideTicket);
    return res.status(200).json({
      status: "ok",
      data: {
        hiddenTickets: hiddenTickets,
      },
    }); // send the array: hiddenTickets
  } catch (err) {
    console.log("Error getting all Tickets");
    return res.status(500).json({
      status: 500,
      error: `Error getting all Tickets: ${err.message}`,
    });
  }
};

//getTicketsByEmail
module.exports = {
  newTicket,
  checkTicket,
  delTicket,
  genOtp,
  getTicket,
  getAllTickets,
};
