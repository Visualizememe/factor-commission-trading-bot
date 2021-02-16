import StripeManager from "./StripeManager";
import DatabaseManager from "./DatabaseManager";
import RedisManager from "./RedisManager";


export default class SubscriptionManager {
    public static async updateUserSubscription (isSubscribed: boolean, customerId?: string) {
        if (!customerId) {
            throw new Error("Did not provide customerId!");
        }
        const customerData = await StripeManager.getCustomer(customerId);
        const discordUserId = (customerData as any)?.metadata?.discordUserId;

        if (!discordUserId) {
            throw new Error(`Did not provide discord user id!`);
        }

        const foundUserData = await DatabaseManager.getUserByDiscordId(discordUserId);

        if (!foundUserData) {
            throw new Error(`Did not find user data!`);
        }

        foundUserData.subscription = isSubscribed;

        await foundUserData.save();

        await RedisManager.publishUserUpdate(discordUserId);

        return true;
    }
}
