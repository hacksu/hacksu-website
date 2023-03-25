let express = require("express");
let api = express.Router();

module.exports = api;

api.post(
  "/mailinglist/subscribe",
  express.text(),
  require("./sendgrid").subscribe
);

api.post(
  "/contact",
  require("body-parser").json(),
  require("./contact").contact
);
