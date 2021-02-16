import express from "express";
import StripeManager from "../../../../controllers/StripeManager";
import config from "../../../../util/config";
import SubscriptionManager from "../../../../controllers/SubscriptionManager";


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

    if (!stripeEvent) {
        return response
            .status(400)
            .json({
                success: false,
                message: "Invalid stripe signature or verification failed!"
            });
    }

    if (stripeEvent.type === "customer.subscription.created") {
        const customerId = (stripeEvent.data.object as any).customer as string;

        const updated = await SubscriptionManager.updateUserSubscription(true, customerId)
            .catch(() => null);

        if (!updated) {
            return response
                .status(500)
                .json({
                    success: false,
                    message: `Failed to update user subscription!`
                });
        }
    } else if (stripeEvent.type === "customer.subscription.deleted") {
        const customerId = (stripeEvent.data.object as any).customer as string;

        const updated = await SubscriptionManager.updateUserSubscription(false, customerId)
            .catch(() => null);

        if (!updated) {
            return response
                .status(500)
                .json({
                    success: false,
                    message: `Failed to update user subscription!`
                });
        }
    } else {
        return response
            .status(400)
            .json({
                success: false,
                message: "No handler for this event!"
            });
    }

    return response
        .status(200)
        .json({
            success: true
        });
});

export default webhookApp;
