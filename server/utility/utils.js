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

require("./logger.js");
