import config from "../util/config";
import jwt from "jsonwebtoken";
import querystring from "querystring";
import got from "got";
import Joi from "joi";


const DiscordSelfUserSchema = Joi.object({
    id: Joi.string()
        .required(),
    username: Joi.string()
        .required(),
    avatar: Joi.allow(Joi.any()),
    discriminator: Joi.string()
        .required(),
    public_flags: Joi.number()
        .required(),
    flags: Joi.number()
        .required(),
    locale: Joi.string()
        .required(),
    mfa_enabled: Joi.bool()
        .required(),
    premium_type: Joi.number()
        .required(),
    email: Joi.string()
        .required(),
    verified: Joi.bool()
        .required()
})
    .required();


class DiscordOAuth2 {
    public static generateRedirectUrl () {
        const discordAuthConfig = config.discordAuthConfig;


        const baseUrl = `https://discord.com/api/oauth2/authorize`;
        const nonceStateToken = jwt.sign({
            hi: "there"
        }, config.secretsConfig.jwtSecretKey);
        const qsStringified = querystring.stringify({
            client_id: discordAuthConfig.discordClientId,
            redirect_uri: encodeURIComponent(discordAuthConfig.redirectConfirmUrl),
            response_type: "code",
            scope: discordAuthConfig.scopes.join("%20"),
            state: nonceStateToken
        }, undefined, undefined, {
            encodeURIComponent: s => s
        });

        return `${baseUrl}?${qsStringified}`;
    }

    public static async fetchAccessToken (code: string): Promise<string> {
        const retrievedAccessData: any | Error = await got({
            url: `https://discord.com/api/oauth2/token`,
            form: {
                client_id: config.discordAuthConfig.discordClientId,
                client_secret: config.secretsConfig.discordClientSecret,
                grant_type: "authorization_code",
                code,
                redirect_uri: config.discordAuthConfig.redirectConfirmUrl,
                scope: config.discordAuthConfig.scopes.join(" ")
            },
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        })
            .json()
            .catch((e: Error) => {
                console.log("An error occurred while retrieving access data!");
                console.log(e);
                return e;
            });

        if (retrievedAccessData instanceof Error) {
            throw retrievedAccessData;
        }

        if (!retrievedAccessData.access_token) {
            throw new Error(`access_token was not present in /token response!`);
        }

        return retrievedAccessData.access_token as string;
    }

    public static getUserDataByAccessToken (accessToken: string): Promise<any> {
        return got({
            url: `https://discord.com/api/users/@me`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .json()
            .catch((e: Error) => {
                console.log("An error ocurred while getting user data!");
                console.log(e);

                return e;
            })
            .then(async data => {
                if (data instanceof Error) {
                    throw data;
                }

                const validData = await DiscordSelfUserSchema.validateAsync(data)
                    .catch(() => null);

                if (!validData) {
                    throw new Error(`Failed to validate incoming self Discord user data!`);
                }

                return validData;
            });
    }
}


export default DiscordOAuth2;
