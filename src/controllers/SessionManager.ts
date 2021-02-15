import jwt from "jsonwebtoken";
import config from "../util/config";


export type Session = {
    discordUserId: string;
}

export default class SessionManager {
    public static async createSession (discordUserId: string): Promise<string> {
        const userData = {
            discordUserId
        };

        return jwt.sign(userData, config.secretsConfig.jwtSecretKey);
    }

    public static async verifySession (session: string): Promise<Session> {
        const verified = jwt.verify(session, config.secretsConfig.jwtSecretKey);

        return verified as Session;
    }
}
