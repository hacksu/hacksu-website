// Hacksu Utilities
// utils.js
// Contains extra functions that are used frequently

global["declare"] = function(name, value) {
  global[name] = value;
  return global[name];
}

declare("express", require("express"));
declare("fs", require("fs"));
declare("chalk", require("chalk"));
declare("request", require("request-promise"));

declare("bodyparser", function(req, res, next) {
  if (req.method == "POST") {
    var data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
  } else {
    next();
  }
})

// Sequence Class
class Sequence_ {
  constructor(cb) {
    this.checkpoints = 0;
    this.progress = 0;
    this.cb = cb;
  }
  checkpoint() {
    var _this = this;
    _this.checkpoints++;
    return function() {
      _this.progress++;
      if (_this.progress >= _this.checkpoints) {
        var _prog = _this.progress + 0;
        setTimeout(function() {
          if (_this.progress >= _this.checkpoints && _this.progress == _prog) {
            _this.cb();
          }
        }, 200);
      }
    }
  }
}
declare("Sequence", Sequence_);

require("./logger.js");
