var app = express();
var port = 8080;


require("./utility/dist.js")(app);
app.listen(port, () => {
  log.success("|[SERVER UP]| Listening on port " + port);
});
