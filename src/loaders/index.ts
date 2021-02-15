import debug from "debug";
import loadMongooseConnection from "./loadMongooseConnection";
import loadExpress from "./loadExpress";
import loadRedisConnections from "./loadRedisConnection";
import loadControllers from "./loadControllers";


const loadersDebug = debug("loaders");

export default async function initLoaders () {
    loadersDebug("Running loaders..");

    loadersDebug("Setting up database connection..");
    const mongooseConnection = await loadMongooseConnection();

    loadersDebug("Setting up redis connection..");
    const redisConnection = await loadRedisConnections();

    loadersDebug("Preparing express application");
    const mainApp = await loadExpress(mongooseConnection);

    loadersDebug("Loading controllers..");
    await loadControllers({
        mongooseConnection
    });

    loadersDebug("Finished running loaders!");

    return {
        mongooseConnection,
        redisConnection,
        mainApp
    };
}
