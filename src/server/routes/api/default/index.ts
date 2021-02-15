import express from "express";


const defaultApiApp = express();

defaultApiApp.get("/", async (_request, response) => response
    .status(200)
    .json({
        success: true,
        message: "Operational"
    }));

export default defaultApiApp;
