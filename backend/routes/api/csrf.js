const express = require("express");
const router = express.Router();

router.get("/restore", (req, res) => {
  const csrfToken = req.csrfToken();

  res.cookie("CSRF-TOKEN", csrfToken, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });

  res.status(200).json({
    "CSRF-Token": csrfToken,
  });
});

module.exports = router;
