import express from "express";
import apiApp from "./routes/api";
import authApp from "./routes/auth";
import siteApp from "./routes/site";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import saveRawBodyMiddleware from "./middlewares/saveRawBodyMiddleware";


const serverApp = express();

serverApp.use(helmet({
    contentSecurityPolicy: false
}));
serverApp.use(saveRawBodyMiddleware);
serverApp.use(cookieParser());
serverApp.use("/api", apiApp);
serverApp.use("/auth", authApp);
serverApp.use("/", siteApp);

export default serverApp;
