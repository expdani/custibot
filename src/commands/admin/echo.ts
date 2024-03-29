import {
  CacheType,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { BaseCommand, IBaseCommand } from "../../classes/BaseCommand";
import { isAdmin } from "../../util/isAdmin";

/*
  This is an example interaction command that echoes your message.
 */
export class Command extends BaseCommand implements IBaseCommand {
  execute(interaction: ChatInputCommandInteraction<CacheType>) {
    if (!isAdmin(interaction.user.id))
      return interaction.reply({
        content: "This command is only for bot administrators.",
        ephemeral: true,
      });

    const message = interaction.options.getString("message");

    return interaction.reply(message);
  }
  data = new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setName("echo")
    .setDescription("Echoes the message you give.")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("A message for the bot to repeat.")
        .setRequired(true)
    );
}
