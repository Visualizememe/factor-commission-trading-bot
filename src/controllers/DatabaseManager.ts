import mongoose, { Model } from "mongoose";
import { UserDatabaseSchema } from "../models/Users";


export default class DatabaseManager {
    public static UsersModel: Model<any> | null = null;

    public static initModels (connection: mongoose.Connection) {
        DatabaseManager.UsersModel = connection.model("user", UserDatabaseSchema);
    }

    public static getUserByDiscordId (discordUserId: string) {
        return DatabaseManager.UsersModel!.findOne({
            userId: discordUserId
        })
            .exec();
    }

    public static createUser (discordUserId: string) {
        return DatabaseManager.UsersModel!.create({
            userId: discordUserId,
            subscription: 0
        });
    }

    public static async setUserStripeCustomerId (discordUserId: string, stripeCustomerId: string) {
        const user = await DatabaseManager.retrieveUserOrCreate(discordUserId);
        user.stripeCustomerId = stripeCustomerId;

        return user.save();
    }

    /**
     * Retrieves an existing user, or creates new data
     * @param {string} discordUserId
     * @returns {Promise<void>}
     */
    public static async retrieveUserOrCreate (discordUserId: string): Promise<any> {
        let foundUser = await DatabaseManager.getUserByDiscordId(discordUserId);

        if (!foundUser) {
            foundUser = await DatabaseManager.createUser(discordUserId);
            return DatabaseManager.retrieveUserOrCreate(discordUserId);
        }

        return foundUser;
    }
}
