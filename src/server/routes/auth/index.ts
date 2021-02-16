import express from "express";
import config from "../../../util/config";
import jwt from "jsonwebtoken";
import Joi from "joi";
import DiscordOAuth2 from "../../../controllers/DiscordOAuth2";
import SessionManager from "../../../controllers/SessionManager";
import DatabaseManager from "../../../controllers/DatabaseManager";
import StripeManager from "../../../controllers/StripeManager";


const authApp = express();

authApp.get("/redirect", async (_request, response) => {
    const redirectUrl = DiscordOAuth2.generateRedirectUrl();

    return response
        .redirect(302, redirectUrl);
});


const VerifyAuthSchema = Joi.object({
    code: Joi.string()
        .required(),
    state: Joi.string()
        .required()
})
    .required();

authApp.get("/verify", async (request, response) => {
    const validatedAuthData = await VerifyAuthSchema.validateAsync({
        code: request.query.code,
        state: request.query.state
    })
        .catch(() => null);

    if (!validatedAuthData) {
        return response
            .status(400)
            .json({
                success: false,
                message: "Invalid auth data received!"
            });
    }

    let verifiedJWT: null | any = null;

    try {
        verifiedJWT = jwt.verify(validatedAuthData.state, config.secretsConfig.jwtSecretKey);
    } catch {
        verifiedJWT = null;
    }

    if (!verifiedJWT) {
        return response
            .status(400)
            .json({
                success: false,
                message: "Invalid state!"
            });
    }

    const accessToken = await DiscordOAuth2.fetchAccessToken(validatedAuthData.code)
        .catch(() => null);

    if (!accessToken) {
        return response
            .status(500)
            .json({
                success: false,
                message: "Invalid code or failed to fetch access token!"
            });
    }

    const userData = await DiscordOAuth2.getUserDataByAccessToken(accessToken)
        .catch(() => null);

    if (!userData) {
        return response
            .status(500)
            .json({
                success: false,
                message: "Invalid access token or failed to get user data!"
            });
    }

    const createdUser = await DatabaseManager.retrieveUserOrCreate(userData.id);

    if (!createdUser.stripeCustomerId) {
        const createdCustomer = await StripeManager.createCustomer(
            userData.id,
            userData.email
        );

        await DatabaseManager.setUserStripeCustomerId(userData.id, createdCustomer.id);
    }

    const createdSession = await SessionManager.createSession(userData.id);

    return response
        .status(200)
        .cookie("auth", createdSession)
        .redirect(302, "/");
});

export default authApp;
