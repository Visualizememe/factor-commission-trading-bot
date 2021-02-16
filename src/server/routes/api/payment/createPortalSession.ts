import StripeManager from "../../../../controllers/StripeManager";
import express from "express";


const createPortalSession = express();

createPortalSession.post("/create-portal-session", async (_request, response) => {
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

export default createPortalSession;
