log.warn("|[INIT]| BEGIN INITIALIZATION...");
global.CONFIG = require(__dirname + "/../config.js");
var app = express();
var port = CONFIG.port;
app.use(express.json());
declare("init", new Sequence(() => {
  var cb = function() {
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
  }
  if (global["ATTACH_APPLICATION"]) {
    global["ATTACH_APPLICATION"].use("/hacksu", app);
    cb();
  } else {
    app.listen(port, cb);
  }
}));
var ready = init.checkpoint();

app.use(require("./router.js"));

require("./utility/dist.js")(app);

ready();
