import initLoaders from "./loaders";
import serverApp from "./server";
import config from "./util/config";
import debug from "debug";


const mainDebug = debug("main");

async function main () {
    mainDebug(`App started!`);

    const { mainApp } = await initLoaders();
    mainApp.use(serverApp);

    mainApp.listen(config.serverConfig.port, () => {
        mainDebug(`Listening to port ${config.serverConfig.port}`);
    });
}


// Application entrypoint
main();
