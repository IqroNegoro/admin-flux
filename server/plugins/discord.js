import { Client, Events, GatewayIntentBits } from "discord.js"
export default defineNitroPlugin(nitroApp => {
    const config = useRuntimeConfig();
    const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

    client.once(Events.ClientReady, event => {
        console.log(`Ready! Logged in as ${event.user.tag}`);
    });
    
    client.on(Events.Error, () => {
        console.log("error")
    });
    
    client.login(config.bot).then(() => {
        nitroApp.client = client;
    });
});