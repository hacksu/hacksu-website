import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import { createServer as createViteServer } from 'vite';
import { remult } from "remult";
import { remultExpress } from "remult/remult-express"

import setUpAuth from "./auth.js";
import setUpUpload from "./upload.js";
import { Redirect, StaffMember } from '../db/entities.js';

let app = express();

setUpAuth(app);
setUpUpload(app);

const db = remultExpress({ entities: [Redirect, StaffMember] });
app.use(db);
app.use("*", db.withRemult, (res, req, next) => {
  remult.repo(Redirect)
    .findFirst({urlSlug: res.originalUrl.substring(1)})
    .then(result => {
      if (result){
        req.redirect(result.destination);
      } else {
        next();
      }
    });
});

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

if (process.env.NODE_ENV == "production"){
  // serve static files from the dist directory (`npm run build` will put the frontend there)
  app.use(express.static(path.resolve(__dirname, "../dist/"), { extensions: ["html"] }));
  app.use(express.static(path.resolve(__dirname, "../public/")));
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
