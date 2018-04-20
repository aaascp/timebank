const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("/surveys");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
