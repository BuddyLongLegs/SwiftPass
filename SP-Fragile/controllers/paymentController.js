require("dotenv/config");

const Razorpay = require('razorpay');
const rp = new Razorpay({key_id: process.env.PAYMENT_KEY, key_secret: process.env.PAYMENT_SECRET});
const hideTicket = require("../utils/detailHider").hideTicket;

const Ticket = require("../models/ticketModel");
const notify = require("../utils/email").notify;
const {
    newTicket,
    checkTicket,
    delTicket,
    genOtp,
    getTicket,
    getAllTickets,
  } = require("./ticketController");

const {
    hash,
    dehash,
    getRandomCode,
    validPassword,
    genPassword,
    encrypt,
    decrypt,
} = require("../utils/math");

const crypto = require("crypto");
const newtickmailcont = require("../utils/mailcontents").showticket;
const createOrder = async (req, res)=>{
    const ticket = await newTicket(req.body);
    if(ticket){
    var options = {
        amount: ticket.amount,
        currency: "INR",
        receipt: ticket.code
    }
    rp.orders.create(options, async (err, order)=>{
        ticket.razorpay_order_id = order.id;
        await ticket.save();
        return res.status(201).json(order);
    });}
}

const verifyOrder = async (req, res)=>{
    let ticket = await Ticket.findOne({code: req.params.code}).exec();
    if(ticket){
        let body=ticket.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
        var expectedSignature = crypto.createHmac('sha256', process.env.PAYMENT_SECRET)
                                    .update(body.toString())
                                    .digest('hex');
        if(expectedSignature === req.body.response.razorpay_signature){
            let hashedid = encrypt(dehash(ticket.code));
            ticket.paid = true;
            ticket.purchasedOn = Date.now();
            ticket.razorpay_payment_id = req.body.response.razorpay_payment_id;
            ticket.razorpay_signature = req.body.response.razorpay_signature;
            await ticket.save();
            let bookedon = new Date(ticket.forDate);
            notify(ticket.email, `Ticket Created for ${(bookedon.getDate()).toString() + " " +bookedon.toLocaleString('default', { month: 'long' })}`, "New Ticket", newtickmailcont(ticket));
            return res.status(202).json({
                status: "success",
                message: `Ticket Paid`,
                data: hideTicket(ticket),
                hashedID: hashedid,
            });
        }
    }
    return res.status(404).json({
        status: "fail",
        message: `Ticket not found`,
    });

}

module.exports = {
    createOrder,
    verifyOrder
}