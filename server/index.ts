import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import { remult } from "remult";
import { remultExpress } from "remult/remult-express";
import { createServer as createViteServer } from 'vite';


import { createPostgresDataProvider } from 'remult/postgres';
import { Event, Information, Note, Redirect, StaffMember, LessonIcon } from '../db/entities.js';
import { setUpAuth } from './auth.js';
import { setUpLogging } from './log.js';
import { setUpUpload } from './upload.js';
import lessonsRouter from './routes/lessons.js';

let app = express();

setUpAuth(app);
setUpUpload(app);
setUpLogging(app);

// API routes
app.use('/api', lessonsRouter);

// set up db:
const db = remultExpress({
  dataProvider: createPostgresDataProvider({ connectionString: process.env.DATABASE_URL! }),
  entities: [Redirect, StaffMember, Event, Note, Information, LessonIcon]
});
app.use(db);

// set up redirects:
app.use("*", db.withRemult, async (req, res, next) => {
  const result = await remult.repo(Redirect)
    .findFirst({ urlSlug: req.originalUrl.substring(1) });
  if (!result) {
    return next();
  }
  return res.redirect(result.destination);
});

// needed so this app knows it's behind a https reverse proxy when creating
// callback urls for oauth. also for receiving ip addresses i guess
app.set("trust proxy", 1);

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

if (process.env.NODE_ENV == "production") {
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
app.listen(port, () => console.log(`Running at http://localhost:${port}`));
