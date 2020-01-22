// Serves the distribution directory of the compiled vue frontend.
module.exports = (app) => {
  /*const history = require('connect-history-api-fallback');
  var dist = __dirname + "/../../dist";
  console.log("omg");
  const staticserve = express.static(dist);
  app.use(staticserve);
  app.use(history({
    index: '/dist/index.html'
  }));
  app.use(staticserve);*/
  var ready = init.checkpoint();
  var init2 = new Sequence(() => {
    log.success("|[VUE APPLICATION ONLINE]| ");
    ready();
  })
  var ready2 = init2.checkpoint();
  const mime = require("mime-types");
  const path = require("path");
  const dist = path.normalize(__dirname + "/../../dist");
  var indexPage;
  var statics = express();
  log.success("|[LOADING VUE]| ");
  require("glob")('/**/*', {
    root: dist,
    nodir: true,
  }, (err, paths) => {
    paths.forEach((item, index) => {
      var ready2 = init2.checkpoint();
      fs.readFile(item, (err, data) => {
        ready2();
        //statics[item.split(dist)[1]] = res;
        var name = item.split(dist)[1];
        var typing = mime.lookup(item);
        statics.get(name, (req, res) => {
          res.contentType(typing);
          res.send(data);
        })
        log.white(chalk.greenBright("> ") + name);
        if (name == "/index.html") {
          indexPage = data;
        } else if (name.indexOf(".map") >= 0) {
          var basename = path.basename(name);
          statics.get(name.split(".map")[0] + "/" + basename, (req, res) => {
            res.contentType(typing);
            res.send(data);
          })
        }
      })
    });
  });
  app.use(statics);
  app.use((req, res) => {
    res.contentType("text/html");
    res.send(indexPage);
  })
  ready2();

}
