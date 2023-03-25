let express = require("express");
let app = express.Router();

module.exports = app;

app.get("/discord", (req, res) => {
  res.redirect("https://discord.gg/rJDdvnt");
});

app.get("/unsubscribe/:email", require("./api/sendgrid").unsubscribe);
