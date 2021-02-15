import express from "express";
import * as mongoose from "mongoose";


export default async function loadExpress (connection: mongoose.Connection) {
    const app = express();

    app.set("mongooseConnection", connection);

    return app;
}
