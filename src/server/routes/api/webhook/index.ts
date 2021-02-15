import express from "express";
import StripeManager from "../../../../controllers/StripeManager";
import config from "../../../../util/config";


const webhookApp = express();

webhookApp.get("/", async (_request, response) => response
    .status(200)
    .json({
        success: true,
        message: "Operational"
    }));

webhookApp.post("/register", async (request, response) => {
    if (!request.body || !request.headers["stripe-signature"]) {
        return response
            .status(400)
            .json({
                success: false,
                message: "Invalid body or did not provide stripe signature"
            });
    }

    const inputStripeSignature = request.headers["stripe-signature"];
    const stripeEvent = await StripeManager.verifyEvent(
        response.locals.rawBody,
        inputStripeSignature as string,
        config.secretsConfig.stripeWebhookSignKey
    )
        .catch(e => {
            console.log("An error while constructing webhook event!");
            console.log(e);

            return null;
        });

    console.log(stripeEvent);

    if (!stripeEvent) {
        return response
            .status(400)
            .json({
                success: false,
                message: "Invalid stripe signature or verification failed!"
            });
    }

    return response
        .status(200)
        .json({
            success: true,
            message: "Yes"
        });
});

export default webhookApp;
