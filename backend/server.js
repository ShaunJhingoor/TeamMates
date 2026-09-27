const app = require("./app");
const mongoose = require("mongoose");
const { mongoURI } = require("./config/keys");

const port = process.env.PORT || 3000;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
