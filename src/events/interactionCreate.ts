import {
  CacheType,
  ChatInputCommandInteraction,
  InteractionType,
} from "discord.js";
import {
  getGuildCommand,
  SingleGuildCommandType,
} from "../apollo/guildCommands";
import { DiscordClient } from "../classes/discord";
import { GuildCommand } from "../controllers/guildCommands/commandHandler";

module.exports = {
  once: false,
  execute: async (
    client: DiscordClient,
    interaction: ChatInputCommandInteraction<CacheType>
  ) => {
    if (interaction.type != InteractionType.ApplicationCommand) return;

    try {
      if (interaction.type === InteractionType.ApplicationCommand) {
        if (client.commands.get(interaction.commandName)?.execute(interaction))
          client.commands.get(interaction.commandName)?.execute(interaction);
        else {
          const command: SingleGuildCommandType = await getGuildCommand(
            interaction.guildId,
            interaction.commandName
          );

          if (command) GuildCommand.execute(interaction, command);
        }
      }
    } catch (err) {
      console.error(err);
    }
  },
};
