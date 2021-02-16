import express from "express";
import StripeManager from "../../../../controllers/StripeManager";


const cancelSubscription = express();

cancelSubscription.post("/", async (_request, response) => {
    const userData = response.locals.userData;
    const userSubscription = await StripeManager.getCustomerSubscription(
        userData.stripeCustomerId
    );
    
    if (!userSubscription) {
        return response
            .status(200)
            .json({
                success: false,
                message: "No active subscription to cancel!"
            });
    }
    
    const cancelledSubscription = await StripeManager.cancelCustomerSubscription(userData.stripeCustomerId);
    
    if (!cancelledSubscription) {
        return response
            .status(200)
            .json({
                success: false,
                message: "Failed to cancel subscription. Either already cancelled or no active subscription found"
            });
    }
    
    return response
        .status(200)
        .json({
            success: true,
            message: "Successfully cancelled subscription!"
        });
});


export default cancelSubscription;
