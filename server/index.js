const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./models/Transaction");
require("./models/Service");
require("./models/Category");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(require("./controllers"));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
} else {
  const path = require("path");
  const fs = require("fs");
  const https = require("https");

  const options = {
    key: fs.readFileSync(path.resolve(__dirname, "config/ssl/localhost.key")),
    cert: fs.readFileSync(path.resolve(__dirname, "config/ssl/localhost.crt"))
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}
