require("dotenv").config();
const express = require("express");
const connectDatabase = require("./Database/db");
const cors = require("cors");
const { faker } = require("@faker-js/faker");
const authRouter = require("./Routes/authroutes");
const {
  Just_Launched,
  User,
  product,
  cycle,
  trademill,
  spinbike,
} = require("./Database/user");
const {
  validateAddtoCart,
  EmptyCart,
  showUserCart,
  getSingleProduct,
  deleteSigleProductFormCart,
} = require("./Controller/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Welcome" });
});
app.use("/auth", authRouter);
app.patch("/cart", validateAddtoCart);
app.get("/cart/:userid", showUserCart);
app.get("/singleProduct/:id", getSingleProduct);
app.patch("/deteleSingleItem", deleteSigleProductFormCart);
app.patch("/orderplace", EmptyCart);
app.get("/Just_Launched", async (req, res) => {
  try {
    let data = [];
    if (req.query.sort !== "null") {
      data = await Just_Launched.find().sort({
        price: parseInt(req.query.sort),
      });
    } else {
      data = await Just_Launched.find();
    }
    res.send({ data });
  } catch (error) {
    res.send({ message: error });
  }
});
app.get("/spinbike", async (req, res) => {
  try {
    let data = [];
    if (req.query.sort !== "null") {
      data = await spinbike.find().sort({ price: parseInt(req.query.sort) });
    } else {
      data = await spinbike.find();
    }
    res.send({ data });
  } catch (error) {
    res.send({ message: error });
  }
});

app.get("/cycle", async (req, res) => {
  try {
    let data = [];
    if (req.query.sort !== "null") {
      data = await cycle.find().sort({ price: parseInt(req.query.sort) });
    } else {
      data = await cycle.find();
    }
    res.send({ data });
  } catch (error) {
    res.send({ message: error });
  }
});

app.get("/trademill", async (req, res) => {
  try {
    let data = [];
    if (req.query.sort !== "null") {
      data = await trademill.find().sort({ price: parseInt(req.query.sort) });
    } else {
      data = await trademill.find();
    }
    res.send({ data });
  } catch (error) {
    res.send({ message: error });
  }
});

app.get("/product", async (req, res) => {
  try {
    //console.log(req.query.sort);
    let data = [];
    if (req.query.sort !== "null") {
      data = await product.find().sort({ price: parseInt(req.query.sort) });
    } else {
      data = await product.find();
    }
    // const data = await Just_Launched.find().sort({ price: 1 });
    res.send({ data });
  } catch (error) {
    res.send({ message: "error" });
  }
});

connectDatabase().then(
  app.listen(3030, () => {
    console.log("Server is Listening on http://localhost:3030");
  })
);
