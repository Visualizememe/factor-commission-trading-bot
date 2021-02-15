import express from "express";
import SessionManager from "../../controllers/SessionManager";
import DatabaseManager from "../../controllers/DatabaseManager";


export default async function sessionMiddleware (request: express.Request, response: express.Response, next: express.NextFunction) {
    if (!request.cookies || !request.cookies.auth) {
        return response
            .status(403)
            .json({
                success: false,
                message: "Not authenticated for this operation!"
            });
    }

    const session = await SessionManager.verifySession(request.cookies.auth)
        .catch(() => null);

    if (!session) {
        return response
            .status(403)
            .json({
                success: false,
                message: "Not authenticated for this operation! (2)"
            });
    }

    const userData = await DatabaseManager.getUserByDiscordId(session.discordUserId);

    if (!userData || !userData.stripeCustomerId) {
        return response
            .status(500)
            .json({
                success: false,
                message: "Failed to retrieve user data or fetch customer id"
            });
    }

    response.locals.userData = userData;
    response.locals.session = session;

    return next();
}
