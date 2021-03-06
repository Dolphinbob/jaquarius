import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import Bot from "../bot";
import Command from "../command";

export class LoopCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Loops the currently playing song.");
  execute(client: Bot, interaction: CommandInteraction): void {
    if (interaction.guildId == null) {
      interaction.reply("This can only be ran in a guild :(");
      return;
    }
    const queue = client.queues.get(interaction.guildId);
    if (!queue) {
      interaction.reply("There is no queue!");
      return;
    }

    queue.isLooped = !queue.isLooped;
    interaction.reply(queue.isLooped ? "Looping..." : "No longer looping.");
  }
}
