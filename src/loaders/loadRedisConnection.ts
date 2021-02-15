import redis from "redis";
import config from "../util/config";


export default async function loadRedisConnection (): Promise<redis.RedisClient> {
    const client = redis.createClient({
        url: config.secretsConfig.redisUrl,
        port: config.secretsConfig.redisPort || 6379
    });

    return new Promise((resolve, reject) => {
        client.auth(config.secretsConfig.redisPassword, error => {
            if (error) {
                return reject(error);
            }

            resolve(client);
        });
    });
}
