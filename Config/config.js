require("dotenv").config({ path: "../.env" });
const config = {
  Jwt_Secret_token: process.env.JWT_Secret,
  Github_Client_Secret: process.env.Github_Client_Secret,
  Github_ClientId: process.env.Github_ClientId,
  Mongo_url: process.env.Monogo_Url,
};

module.exports = config;
