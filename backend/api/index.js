const mongoose = require("mongoose");
const app = require("../app");
const { mongoURI } = require("../config/keys");

let connectionPromise;

if (!connectionPromise) {
  connectionPromise = mongoose.connect(mongoURI);
}

module.exports = async (req, res) => {
  try {
    await connectionPromise;
    return app(req, res);
  } catch (error) {
    console.error("MongoDB connection error:", error);

    return res.status(500).json({
      message: "Database connection failed",
    });
  }
};
