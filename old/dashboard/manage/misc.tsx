import { DiscordServer, DiscordServerData } from "../../../util/interfaces/types";
import { updateServerData } from "../../../util/webAPI/api";


export function updateSettings<State> (state: State, options: {
    serverId: DiscordServer["id"],
    targetName: keyof DiscordServerData,
    stateName: keyof typeof state,
    friendlyName?: string
}): () => void {
    return (): Promise<boolean> => {
        return updateServerData(
            options.serverId,
            options.targetName,
            state[options.stateName] as any
        ).then(success => success);
    };
}
