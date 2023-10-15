// global.config = require(__dirname + "/../server.config.json");

import path from 'path';
import { fileURLToPath } from 'url';

import express from "express";
import { createServer as createViteServer } from 'vite'

let app = express();
// app.set("trust proxy", 1);

// app.use(require("./routes"));
// app.use(
//   "/api",
//   (req, res, next) => {
//     req.headers["x-forwarded-for"] =
//       req.headers["x-forwarded-for"] || req.headers["x-real-ip"];
//     req.ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
//     next();
//   },
//   require("./routes/api")
// );

// app.use(require("./redirects"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV == "production"){
  // serve static files from the dist directory (`npm run build` will put the frontend there)
  let serve = express.static(dist, { extensions: ["html"] });
  app.use(serve);
} else {
  // serve live-updated pages with vite
  const vite = await createViteServer({
    server: { middlewareMode: true },
    root: path.resolve(__dirname, "..", "src/"),
    publicDir: path.resolve(__dirname, "..", "public/")
  });
  app.use(vite.middlewares);
}


let port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("Listening on port", port);
});
