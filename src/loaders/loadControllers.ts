import StripeManager from "../controllers/StripeManager";
import DatabaseManager from "../controllers/DatabaseManager";
import mongoose from "mongoose";


export default function loadControllers (options: {
    mongooseConnection: mongoose.Connection
}) {
    StripeManager.init();
    DatabaseManager.initModels(options.mongooseConnection);
}
