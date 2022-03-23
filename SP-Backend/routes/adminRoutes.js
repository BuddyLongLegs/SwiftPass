const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  newAdmin,
  adminLogin,
  getAllAdmins,
  getAdminByUsername,
  deleteAdmin,
  logoutAdmin,
} = require("../controllers/adminController");

const {
  newTicket,
  checkTicket,
  payTicket,
  delTicket,
  genOtp,
  getTicket,
  getALlTickets,
} = require("../controllers/ticketController");

const ifAdmin = require("../controllers/middlewares").ifAdmin;

router.post("/login", passport.authenticate("admin-local"), adminLogin);

router.post("/checkticket", ifAdmin, checkTicket);

router.get("/logout", ifAdmin, logoutAdmin);

router.post("/new", newAdmin);

module.exports = router;
