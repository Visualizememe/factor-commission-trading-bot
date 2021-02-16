const commandsList = [
    {
        command: "kick",
        description: "Kicks the user from the server",
        category: "moderation"
    },
    {
        command: "ban",
        description: "Bans the user from the server",
        category: "moderation"
    }
] as { command: string; description: string; category: string }[];

export default commandsList;
