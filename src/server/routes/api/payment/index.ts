import express from "express";
import sessionMiddleware from "../../../middlewares/sessionMiddleware";
import createCheckoutSession from "./createCheckoutSession";
import createPortalSession from "./createPortalSession";
import cancelSubscription from "./cancelSubscription";
import getSubscriptionStatus from "./getSubscriptionStatus";


const paymentApp = express();

// Middleware to ensure the user is doing authenticated & authorized actions
paymentApp.use(sessionMiddleware);

// Routing
paymentApp.use("/create-checkout-session", createCheckoutSession);
paymentApp.use("/create-portal-session", createPortalSession);
paymentApp.use("/cancel-subscription", cancelSubscription);
paymentApp.use("/get-subscription-status", getSubscriptionStatus);

export default paymentApp;
