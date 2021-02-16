import redis, { RedisClient } from "redis";
import config from "../util/config";


export default class RedisManager {
    public static publisherClient: null | RedisClient = null;
    public static subscriberClient: null | RedisClient = null;

    public static async init () {
        RedisManager.publisherClient = redis.createClient({
            url: config.secretsConfig.redisUrl,
            port: config.secretsConfig.redisPort
        });
        RedisManager.subscriberClient = redis.createClient({
            url: config.secretsConfig.redisUrl,
            port: config.secretsConfig.redisPort,
            password: config.secretsConfig.redisPassword
        })
            .on("message", (channel, message) => {
                console.log(channel, message);
            });

        RedisManager.subscriberClient.subscribe("user_updates");

        return new Promise((resolve, reject) => {
            RedisManager.publisherClient!.auth(config.secretsConfig.redisPassword, error => {
                if (error) {
                    return reject(error);
                }

                resolve(true);
            });
        });
    }

    public static async publishUserUpdate (discordUserId: string) {
        RedisManager.publisherClient!.publish(
            "user_updates",
            JSON.stringify({
                userId: discordUserId
            })
        );
    }
}
