const config = require("../Config/config");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const Instance = new Razorpay({
  key_id: config.RAZORPAY_API_KEY,
  key_secret: config.RAZORPAY_API_SECRET,
});
const getkey = async (req, res) => {
  res.status(200).send({ key: config.RAZORPAY_API_KEY });
};

const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  let order;
  try {
    order = await Instance.orders.create(options);
  } catch (error) {
    return res.status(400).send({ error, success: false });
  }

  return res.status(200).send({ success: true, order });
};

const paymentVerifcation = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  console.log(req.body);
  //console.log(req.body.response.razorpay_order_id);
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const verification = crypto
    .createHmac("sha256", config.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  if (verification === razorpay_signature) {
    //database here in future
    //  res.redirect(
    //       `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    //     );
    res.status(200).send({ success: true });
  } else {
    res.status(400).send({ success: false });
  }
};

module.exports = {
  getkey,
  checkout,
  paymentVerifcation,
};
