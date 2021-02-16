import express from "express";
import StripeManager from "../../../../controllers/StripeManager";
import config from "../../../../util/config";


const createCheckoutSession = express();

createCheckoutSession.post("/", async (_request, response) => {
    const userData = response.locals.userData;
    const hasActiveSubscription = await StripeManager.getCustomerSubscription(userData.stripeCustomerId);

    if (hasActiveSubscription) {
        return response
            .status(200)
            .json({
                success: false,
                message: "Already has subscription!"
            });
    }

    const createdCheckoutSession = await StripeManager.createCheckoutSession(userData.stripeCustomerId, config.stripeConfig.subscriptionPriceId);

    return response
        .status(200)
        .json({
            success: true,
            data: {
                sessionId: createdCheckoutSession.id
            }
        });
});

export default createCheckoutSession;
