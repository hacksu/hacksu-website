var logTypes = {
  error: chalk.redBright,
  warn: chalk.yellowBright,
  info: chalk.blueBright,
  success: chalk.greenBright,
  log: chalk.white,
}
var logHint = {
  error: [" ERROR ", chalk.bgRedBright.black, "\t"],
  warn: [" WARN ", chalk.bgYellowBright.black, "\t"],
  info: [" INFO ", chalk.bgBlueBright.black, "\t"],
  success: [" SUCCESS ", chalk.bgGreenBright.black, " "],
  log: "\t"
}

var _log = console.log;
var logKeys = Object.keys(logTypes);
var util = require("util");
declare("log", (type, ...args) => {
  var type_;
  var type2_;
  var coloring = true;
  if (type && logTypes[type]) {
    coloring = false;
    type_ = logTypes[type];
    type2_ = type;
  } else {
    type_ = logTypes["log"];
    type2_ = "log";
    args.unshift(type);
  }
  var hint_ = (logHint[type2_] || false);
  hint_ = hint_.slice(0);
  var msg = "";
  try {
    if (args[0].indexOf("|[") == 0 && args[0].indexOf("]| ") >= 0) {
      //var args = ["|[u wot]| omg hi |[there yeah it works ok. yeet]| pls."];
      var splt = args[0].split("|[");
      splt.shift();
      splt = splt.join("|[");
      //console.log(splt);
      splt = splt.split("]| ");
      //var hint_ = [];
      //console.log(splt);
      hint_[0] = " " + splt[0] + " ";
      splt.shift();
      splt = splt.join("]| ");
      args[0] = splt;
      //console.log(args[0]);
      //console.log(hint_);
    }
  } catch (e) {
    //console.log(e);
  }
  if (hint_) {
    if (typeof(hint_) == "string") {
      msg += hint_;
    } else {
      msg += hint_[1](hint_[0]);
      if (hint_.length >= 3) {
        msg += hint_[2];
      }
    }
  }
  args.forEach(item => {
    var type__ = typeof(item);
    var str = String(item);
    if (typeof(item) == "string") {

    } else {
      var str2 = util.inspect(item, showHidden = false, depth = 7, colorize = coloring);
      if (!(str2.slice(-1) == "'" && str2.substr(0, 1) == "'")) {
        str = str2;
      }
    }
    msg += type_(str);
  });
  _log(msg);
});

Object.keys(logTypes).forEach(item => {
  log[item] = function(...args) {
    args.unshift(item);
    return log.apply(log, args);
  }
  log["_" + item] = logTypes[item];
})
Object.entries({
  red: chalk.redBright,
  yellow: chalk.yellowBright,
  blue: chalk.blueBright,
  green: chalk.greenBright,
  white: chalk.white,
}).forEach(pair => {
  var func = pair[1]
  log[pair[0]] = function(...args) {
    args.forEach((item, index) => {
      args[index] = func(item);
    })
    log.apply(log, args);
  }
})

process.on("uncaughtException", (e) => {
  //console.error(e);
  log.error(e);
  //log.error(e);
  //log(o);
  //log.error(e, a, b, c);
})
process.on("warning", (w) => {
  log.warn(w);
});

/*log("hi there");
log("error", "omg");
log.error("u wot");
log("yeet");
log.warn("omg rip");
log.info("hey shit is working");
log.info("hey stuff is " + chalk.green("working") + " okay?")
log.success("yay");*/
