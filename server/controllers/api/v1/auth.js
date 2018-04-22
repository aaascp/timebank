const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.send(req.user);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.send(`Bye ${req.user.name}`);
});

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
