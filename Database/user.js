const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    gender: String,
    image: String,
    cart: [String],
    githubUsername: String,
    signinMethod: String,
  },
  {
    timestamps: true,
  }
);
const just_Launched = new mongoose.Schema({
  id: Number,
  cname: String,
  title: String,
  desc: String,
  DETAILS: [String],
  price: Number,
  strikePrice: Number,
  discount: Number,
  thumbnail: String,

  img1: String,

  img2: String,
  img3: String,
  img4: String,
  img5: String,
  img6: String,
});
const User = mongoose.model("User", userSchema);
const Just_Launched = mongoose.model("Just_Launched", just_Launched);
const cycle = mongoose.model("cycles", just_Launched);
const product = mongoose.model("product", just_Launched);
const spinbike = mongoose.model("spinbike", just_Launched);
const trademill = mongoose.model("trademill", just_Launched);

module.exports = {
  User,
  Just_Launched,
  cycle,
  product,
  spinbike,
  trademill,
};
