import express from "express";
import StripeManager from "../../../../controllers/StripeManager";
import Joi from "joi";


const createCheckoutSession = express();

const CreateCheckoutSessionSchema = Joi.object({
    priceId: Joi.string()
        .required()
})
    .required();

createCheckoutSession.post("/", async (request, response) => {
    const validatedBody = await CreateCheckoutSessionSchema.validateAsync(request.body)
        .catch(() => null);
    
    if (!validatedBody) {
        return response
            .status(400)
            .json({
                success: false,
                message: "Invalid body"
            });
    }
    
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
    
    const createdCheckoutSession = await StripeManager.createCheckoutSession(userData.stripeCustomerId, validatedBody.priceId);
    
    return response
        .status(200)
        .json({
            success: true,
            createdCheckoutSession
        });
});

export default createCheckoutSession;
