const express = require("express");
const {
  getkey,
  checkout,
  paymentVerifcation,
} = require("../Controller/payment");

const PaymentRouter = express.Router();
PaymentRouter.get("/key", getkey);
PaymentRouter.post("/checkout", checkout);
PaymentRouter.post("/paymentverify", paymentVerifcation);

module.exports = PaymentRouter;
