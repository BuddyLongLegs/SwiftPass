const express = require("express");
const router = express.Router();

const {
    newTicket,
    checkTicket,
    payTicket,
    delTicket,
    genOtp,
    getTicket,
    getALlTickets
} = require("../controllers/ticketController");


router.post("/new", newTicket);

router.get("/showticket/:hashedID", getTicket);

router.get("/pay/:hashedID", payTicket); // experimental

router.delete("/del/:hashedID", delTicket); // experimental











module.exports = router;