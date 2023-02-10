const express = require("express");
const {
  test,
  login,
  registerUser,
  loginwithtoken,
} = require("../Controller/auth");

const authRouter = express.Router();

authRouter.get("/", test);
authRouter.post("/login", login);
authRouter.post("/register", registerUser);
authRouter.get("/getLoggedIn", loginwithtoken);

module.exports = authRouter;
