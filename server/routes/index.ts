import express from "express";

export const app = express.Router();
app.get("/discord", (req, res) => res.redirect("https://discord.gg/rJDdvnt"));
app.get("/unsubscribe/:email", require("./api/sendgrid").unsubscribe);
