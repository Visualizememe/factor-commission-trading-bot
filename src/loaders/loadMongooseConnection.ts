import mongoose from "mongoose";
import config from "../util/config";


export default async function loadMongooseConnection () {
    await mongoose.connect(
        config.secretsConfig.mongooseUrl,
        {
            useNewUrlParser: true
        }
    );

    const connection = mongoose.connection;

    connection.on("error", error => {
        console.log(`Encountered an error with mongoose connection!`);
        throw error;
    });

    return connection;
}
