const {
    EmbedBuilder,
  } = require("discord.js");
  const { Types } = require("mongoose");
  
  const ticketSchema = require("../../Schemas/ticketSchema");

  module.exports = {
    subCommand: "tickets.delete",

    async execute(interaction) {
        const ticketData = await ticketSchema.findOne({
            guildId: interaction.guild.id,
          });
    
          if (!ticketData) {
            return interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle("Ticket System")
                  .setDescription("You already have a ticket system setup!")
                  .addFields(
                    {
                      name: "<:SlashCmd:1016055567724326912> Usage",
                      value: "<:reply:1015235235195146301>  /tickets setup",
                      inline: true,
                    },
                    {
                      name: "<:channelemoji:1015242699277873192> Existing channel",
                      value: `<:reply:1015235235195146301>  <#${ticketData.channelId}>`,
                    }
                  ),
              ],
              ephemeral: true,
            });
          }
    
          ticketSchema
            .findOneAndDelete({
              guildId: interaction.guild.id,
            })
            .catch((err) => console.log(err));
    
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("Ticket System")
                .setDescription("Successfully deleted the ticket system!"),
            ],
            ephemeral: true,
          });
    }
  }