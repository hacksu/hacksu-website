log.warn("|[INIT]| BEGIN INITIALIZATION...");
var config = require(__dirname + "/../config.js");
var app = express();
var port = config.port;
app.use(express.json());
declare("init", new Sequence(() => {
  app.listen(port, () => {
    log.success("|[SERVER UP]| Listening on port " + port);
    global.READY_TIME = (new Date()).getTime();
    var seconds = (READY_TIME - START_TIME) / 1000;
    log.info("|[READY]| Took " + seconds + "s to initialize");
    log("");
    log("");
    var str = "You can visit at " + chalk.greenBright("localhost:" + port);
    log.blue(str);
    log(("―".repeat(str.length * 0.773)));
    log("");
  });
}));
var ready = init.checkpoint();

app.use(require("./router.js"));

require("./utility/dist.js")(app);

ready();
