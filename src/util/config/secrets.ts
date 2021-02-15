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
    mongooseUrl: "mongodb://admin:xHcTRUiOFzkz1KoanneqVMdZB1JNcX5N@ujmbhc.stackhero-network.com:27017/?ssl=true",
    redisUrl: "redis://2dlb0q.stackhero-network.com/",
    redisPort: 6379,
    redisPassword: "hKqSTtzOdNmq6y56oj0yhJvZo04M6LoLFHDIvV3UKsqeeu4RLnNwail9s3Eps4Hk",
    discordClientSecret: "mUuuroH9tS4cREIeokYwR2KjfXuWe8A3",
    jwtSecretKey: "hi",
    stripeSecretKey: "sk_test_51ILBKjE3PATAwyWiEJg9L4gJ4ZRHaqW8B8YgnNQ4APzYjnxHkIPZhQdBGPVYZqv7jbo6TRnsNKs4Tkt6KiqiKpVW00n4YVArSU",
    stripeWebhookSignKey: "whsec_Vh8cfElwIVK6sjmXMdY5JroFjy8ezKEd"
};


export default secretsConfig;
