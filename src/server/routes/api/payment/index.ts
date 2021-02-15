import express from "express";
import sessionMiddleware from "../../../middlewares/sessionMiddleware";
import StripeManager from "../../../../controllers/StripeManager";
import Joi from "joi";


const paymentApp = express();
paymentApp.use(sessionMiddleware);


paymentApp.post("/create-portal-session", async (_request, response) => {
    const userData = response.locals.userData as any;
    const createdSession = await StripeManager.createPortalSession(userData.stripeCustomerId)
        .catch((e: Error) => {
            console.log("An error occurred while creating portal session!");
            console.log(e);

            return null;
        });

    if (!createdSession) {
        return response
            .status(500)
            .json({
                success: false,
                message: "Failed to create portal session!"
            });
    }

    return response
        .status(200)
        .json({
            success: true,
            data: {
                url: createdSession.url
            }
        });
});


const CreateCheckoutSessionSchema = Joi.object({
    priceId: Joi.string()
        .required()
})
    .required();

paymentApp.post("/create-checkout-session", async (request, response) => {
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

export default paymentApp;
