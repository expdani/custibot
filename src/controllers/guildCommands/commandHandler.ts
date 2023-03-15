import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { SingleCommandType } from "../../apollo/guildCommands";
import { BaseCommand, IBaseCommand } from "../../classes/BaseCommand";

export type GuildCommandType = {
  server_id: string;
  name: string;
  command: SingleCommandType;
};

/*
  This is the global command handler for guild commands from the database.
 */
export class GuildCommand extends BaseCommand implements IBaseCommand {
  static execute(
    interaction: ChatInputCommandInteraction<CacheType>,
    commandData: GuildCommandType
  ) {
    const command = commandData.command;
    return interaction.reply({
      content: command.action.message,
      ephemeral: command.action.ephemeral,
    });
  }
}
