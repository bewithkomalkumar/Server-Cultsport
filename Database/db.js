const mongoose = require("mongoose");
const config = require("../Config/config");
const connectDatabase = async () => {
  const db = await mongoose.connect(config.Mongo_url);

  return db;
};

module.exports = connectDatabase;
