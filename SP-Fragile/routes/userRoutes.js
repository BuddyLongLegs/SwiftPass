const express = require("express");
const router = express.Router();

const {
    newTicket,
    checkTicket,
    delTicket,
    genOtp,
    getTicket,
    getALlTickets
} = require("../controllers/ticketController");


const {
    createOrder,
    verifyOrder
} = require("../controllers/paymentController");

router.post("/new", createOrder);

router.get("/showticket/:hashedID", getTicket);

router.get("/pay/verify", verifyOrder); // experimental

router.delete("/del/:hashedID", delTicket); // experimental













module.exports = router;