import express from "express";
import path from "path";


const siteApp = express();

siteApp.get("/payment-success", (_req, res) => res.end("payment success!"));
siteApp.get("/payment-cancelled", (_req, res) => res.end("payment cancelled!"));
siteApp.use("/", express.static(path.join(__dirname, "../../../../../website")));

export default siteApp;
