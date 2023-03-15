import { readdirSync } from "fs";
import { getAllGuildCommands } from "../apollo/guildCommands";
import { BaseCommand } from "../classes/BaseCommand";
import { DiscordClient } from "../classes/discord";
import { REST, Routes } from "discord.js";

const REFRESH_TIME = 30; // seconds
/**
 * Should only fire once!
 */
export const once = true;
/*
  This is an event that gets triggered on ready.
 */
export const execute = async (client: DiscordClient) => {
  const { commands, application } = client;

  const commandCategories = readdirSync("./src/commands");

  for (const category of commandCategories) {
    const commandFiles = readdirSync(`./src/commands/${category}`).filter(
      (file: any) => file.endsWith(".js") || file.endsWith(".ts")
    );

    for (const file of commandFiles) {
      const commandInteraction: BaseCommand =
        new (require(`../commands/${category}/${file}`).Command)();
      commands.set(commandInteraction.data.name, commandInteraction);
    }
  }

  const commandData = commands.map((i) => i.data);

  setInterval(() => {
    initiateCustomGuildCommands(client);
  }, REFRESH_TIME * 1000);

  // @ts-ignore
  return application.commands?.set(commandData);
};

export const initiateCustomGuildCommands = async (client: DiscordClient) => {
  const guilds = await getAllGuildCommands();

  for (const commandGuild of guilds) {
    client.guilds.fetch(commandGuild.server_id).then((guild) => {
      const rest = new REST({ version: "10" }).setToken(client.token);

      const commandData = commandGuild.commands.map((i) => ({
        name: i.name,
        description: i.description,
        options: i.options,
      }));

      rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), {
        body: commandData,
      });
    });
  }
};
