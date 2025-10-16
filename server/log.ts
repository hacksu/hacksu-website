import express, { type Application } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const setUpLogging = (app: Application) => {
    const logFile = "audit-log.txt";

    if (!fs.existsSync(logFile)) {
        fs.openSync(logFile, "a");
    }
    app.use("/api/*", express.json(), async (req, res, next) => {
        if (req.method != "GET" && !req.originalUrl.includes("/stream") && 
            !req.originalUrl.includes("_liveQueryKeepAlive")
                && !req.originalUrl.includes("endLiveQuery")) {
            let log =
                `${new Date().toISOString()}: ${req.method} to ${req.originalUrl} from ` +
                `${req.user ? "@" + req.user.username + ` (${req.user.id})` : "logged out visitor"}`;
            if (req.body) {
                log += ` with body: ${JSON.stringify(req.body)}\n`;
            } else {
                log += "\n";
            }
            await fs.promises.appendFile(logFile, log);
        }
        next();
    });
    app.get("/audit-log", (req, res) => {
        if (req.isAuthenticated() && req.user?.isLeader) {
            res.header("Content-Type", "text/plain");
            res.sendFile(path.resolve(__dirname, "..", logFile));
        } else {
            // this is taken care of in setUpAuth too, but just to be safe:
            res.status(403);
            res.send("forbidden >:(");
        }
    });
}
