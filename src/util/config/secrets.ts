export type Secrets = {
    mongooseUrl: string;
    redisUrl: string;
    redisPort: number;
    redisPassword: string;
    discordClientSecret: string;
    jwtSecretKey: string;
    stripeSecretKey: string;
    stripeWebhookSignKey: string;
};

const secretsConfig: Secrets = {
    mongooseUrl: "",
    redisUrl: "redis://localhost",
    redisPort: 6379,
    redisPassword: "",
    discordClientSecret: "",
    jwtSecretKey: "",
    stripeSecretKey: "",
    stripeWebhookSignKey: ""
};


export default secretsConfig;
