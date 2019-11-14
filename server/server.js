var app = express();
var port = 8080;
app.use(express.json());
declare("init", new Sequence(() => {
  app.listen(port, () => {
    log.success("|[SERVER UP]| Listening on port " + port);
  });
}));
var ready = init.checkpoint();

app.use(require("./router.js"));

require("./utility/dist.js")(app);

ready();
