import StripeManager from "../controllers/StripeManager";
import DatabaseManager from "../controllers/DatabaseManager";
import mongoose from "mongoose";
import RedisManager from "../controllers/RedisManager";


export default async function loadControllers (options: {
    mongooseConnection: mongoose.Connection
}) {
    StripeManager.init();
    DatabaseManager.initModels(options.mongooseConnection);
    await RedisManager.init();
}
