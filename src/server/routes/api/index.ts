import express from "express";
import webhookApp from "./webhook";
import defaultApiApp from "./default";
import paymentApp from "./payment";


const apiApp = express();

apiApp.use("/webhook", webhookApp);
apiApp.use("/payment", paymentApp);
apiApp.use("/", defaultApiApp);

export default apiApp;
