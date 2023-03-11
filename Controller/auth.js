const config = require("../Config/config");
const {
  User,
  product,
  Just_Launched,
  cycle,
  trademill,
  spinbike,
} = require("../Database/user");
const jwt = require("jsonwebtoken");
const secret = config.Jwt_Secret_token;
//console.log(config.Jwt_Secret_token);
const test = async (req, res) => {
  try {
    res.send({ message: "Hello  Router champion" });
  } catch (err) {
    console.log(err);
    res.send({ message: "ERROR" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log(req.body);
    let user = await User.findOne({ email });
    //console.log(user);
    if (user) {
      if (user.password == password) {
        const token = jwt.sign(
          { name: user.name, email: user.email, image: user.image },
          secret
        );

        user = user.toJSON();

        delete user.password;

        res.send({
          message: "Login Sucessfull",
          token: token,
          data: user,
        });
      } else {
        res.send({ message: "worng password" });
      }
    } else {
      res.send({ message: "user not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Worng Cledenyial" });
  }
};
const loginWithGithub = async (req, res) => {
  try {
    res.send({ message: "Hello  Router champion" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something Went Worng" });
  }
};
const registerUser = async (req, res) => {
  try {
    const { email } = req.body;
    const UserAllreadyExist = await User.findOne({ email: email });

    if (UserAllreadyExist) {
      return res
        .status(401)
        .send({ message: "User Already Exist with this email id" });
    }

    await User.create({ ...req.body });

    const addedUser = await User.findOne({ email: email });
    res.send({ New_User: addedUser });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something Went Worng" });
  }
};
const loginwithtoken = async (req, res) => {
  const authorization = req.headers["authorization"];
  if (authorization) {
    const token = authorization.split(" ").pop();
    // console.log(token);
    if (token) {
      try {
        jwt.verify(token, secret);
      } catch (error) {
        return res.status(401).send("Invalid token");
      }

      let user = jwt.decode(token);

      user = await User.findOne({ email: user.email });

      user = user.toJSON();

      delete user.password;
      return res.send({ message: "Login Sucessfull", data: user });
    }
  }
  res.send({ message: "someting went wrong" });
};

const validateAddtoCart = async (req, res) => {
  const authorization = req.headers["authorization"];
  console.log(authorization);
  const token = authorization.split(" ").pop();
  // console.log(token);
  if (token) {
    try {
      jwt.verify(token, secret);
    } catch (error) {
      return res.status(401).send("Invalid token");
    }

    let user = jwt.decode(token);

    user = await User.findOne({ email: user.email });
    console.log(user.cart, req.body.productid);
    await User.findByIdAndUpdate(user._id, {
      cart: [...user.cart, req.body.productid],
    });
    const updated = await User.findOne({ _id: user._id });
    return res.send({ message: "Item Added to cart", data: updated });
  }
  res.send({ message: "someting went wrong" });
};
const EmptyCart = async (req, res) => {
  const authorization = req.headers["authorization"];

  const token = authorization.split(" ").pop();
  // console.log(token);
  if (token) {
    try {
      jwt.verify(token, secret);
    } catch (error) {
      return res.status(401).send("Invalid token");
    }

    let user = jwt.decode(token);

    user = await User.findOne({ email: user.email });

    await User.findByIdAndUpdate(user._id, {
      cart: [],
    });
    const updated = await User.findOne({ _id: user._id });
    return res.send({ message: "Oder Placed", data: updated });
  }
  res.send({ message: "someting went wrong" });
};

const showUserCart = async (req, res) => {
  const userid = req.params.userid;
  try {
    const user = await User.findById(userid);
    if (user) {
      const cart = user.cart;
      const allcart = [];
      if (cart.length == []) {
        return res.send({ data: [] });
      }
      for (let i = 0; i < cart.length; i++) {
        let item = await product.findById(cart[i]);
        if (item) {
          allcart.push(item);
          continue;
        }
        item = await Just_Launched.findById(cart[i]);

        if (item) {
          allcart.push(item);
          continue;
        }

        item = await cycle.findById(cart[i]);
        if (item) {
          allcart.push(item);
          continue;
        }
        item = await trademill.findById(cart[i]);
        if (item) {
          allcart.push(item);
          continue;
        }

        item = await spinbike.findById(cart[i]);
        if (item) {
          allcart.push(item);
          continue;
        }
      }

      return res.send({ data: allcart });
    }
  } catch (err) {
    res.send({ message: "Error" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    let item = await product.findById(req.params.id);
    if (item) {
      return res.send({ data: item });
    }
    item = await Just_Launched.findById(req.params.id);
    if (item) {
      return res.send({ data: item });
    }
    item = await cycle.findById(req.params.id);
    if (item) {
      return res.send({ data: item });
    }
    item = await trademill.findById(req.params.id);
    if (item) {
      return res.send({ data: item });
    }
    item = await spinbike.findById(req.params.id);

    return res.send({ data: item });
  } catch (err) {
    res.status(500).send({ message: "error" });
  }
};
const deleteSigleProductFormCart = async (req, res) => {
  const authorization = req.headers["authorization"];
  console.log(authorization);
  const token = authorization.split(" ").pop();
  // console.log(token);
  if (token) {
    try {
      jwt.verify(token, secret);
    } catch (error) {
      return res.status(401).send("Invalid token");
    }

    let user = jwt.decode(token);

    user = await User.findOne({ email: user.email });
    console.log(user.cart, req.body.productid);
    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i] === req.body.productid) {
        user.cart.splice(i, 1);
        break;
      }
    }
    await User.findByIdAndUpdate(user._id, {
      cart: user.cart,
    });
    const updated = await User.findOne({ _id: user._id });
    return res.send({ message: "Item Removed from cart", data: updated });
  }
  res.send({ message: "someting went wrong" });
};
module.exports = {
  test,
  registerUser,
  loginWithGithub,
  login,
  loginwithtoken,
  validateAddtoCart,
  EmptyCart,
  showUserCart,
  getSingleProduct,
  deleteSigleProductFormCart,
};
