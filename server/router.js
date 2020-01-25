log.success("|[LOADING ROUTER]| ");
var app = express();
module.exports = app;

app.use("/", express.static(__dirname + "/static"));

// Sendgrid Subscribing
require("./modules/sendgrid.js");
app.post("/email/subscribe", (req, res) => {
  sendgridSubscribe(req.body.email);
})
