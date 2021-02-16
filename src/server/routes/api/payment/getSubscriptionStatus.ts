import express from "express";
import StripeManager from "../../../../controllers/StripeManager";


const getSubscriptionStatus = express();

getSubscriptionStatus.post("/", async (_request, response) => {
    const userData = response.locals.userData;
    const subscriptionData = await StripeManager.getCustomerSubscription(userData.stripeCustomerId);

    return response
        .status(200)
        .json({
            success: true,
            data: {
                hasSubscription: !!subscriptionData,
                isCancelled: (subscriptionData?.cancel_at_period_end) ?? false
            }
        });
});

export default getSubscriptionStatus;
