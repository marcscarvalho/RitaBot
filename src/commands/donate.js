// -----------------
// Global variables
// -----------------

// codebeat:disable[LOC,ABC,BLOCK_NESTING,ARITY]
/* eslint-disable no-undef */
const colors = require("../core/colors");
const logger = require("../core/logger");
const discord = require("discord.js");

// -------------
// Command Code
// -------------

module.exports.run = function(data)

{
   // -----------------------------------
   // Error if settings param is missing
   // -----------------------------------

   if (!data.cmd.params)
   {
      data.color = "error";
      data.text =
         ":warning:  Missing `donate` parameter. Use `" +
         `${data.config.translateCmdShort} help donate\` to learn more.`;

      // -------------
      // Send message
      // -------------

      sendMessage(data);
   }

   // ----------------
   // Execute setting
   // ----------------
   if (data.message)
   {
      donate(data);
   }
};

// -------------------------------
// Donate varible command handaler
// -------------------------------

const donate = function(data)
{
   const commandVariable1 = data.cmd.params.split(" ")[0].toLowerCase();

   if (commandVariable1 === "github")
   {
      console.log(commandVariable1);
      return (
         data.message.channel.guild.id,
         commandVariable1,
         function(err)
         {
            if (err)
            {
               return logger("error", err);
            }
            var outputgh =
            "**```Donate via github```**\n" +
            `Thank you for wanting to donate to the RITA Bot Project \n` +
            `https://github.com/sponsors/RitaBot-Project\n\n`;
            data.color = "info";
            data.text = outputgh;

            // -------------
            // Send message
            // -------------

            sendMessage(data);
         }
      );
   }
   else if (commandVariable1 === "oc")
   {
      console.log(commandVariable1);
      return (
         data.message.channel.guild.id,
         commandVariable1,
         function(err)
         {
            if (err)
            {
               return logger("error", err);
            }
            var outputoc =
          "**```Donate via Open Collective```**\n" +
          `Thank you for wanting to donate to the RITA Bot Project \n` +
          `https://opencollective.com/ritabot-project\n\n`;
            data.color = "info";
            data.text = outputoc;

            // -------------
            // Send message
            // -------------

            sendMessage(data);
         }
      );
   }

   data.color = "error";
   data.text =
      ":warning:  **`" + commandVariable1 +
      "`** is not a valid donate option.\n";

   // -------------
   // Send message
   // -------------

   sendMessage(data);
};

// ----------------------
// Send message function
// ----------------------

function sendMessage (data)
{
   data.message.delete(5000);
   const richEmbedMessage = new discord.RichEmbed()
      .setColor(colors.get(data.color))
      .setAuthor(data.bot.username, data.bot.displayAvatarURL)
      .setDescription(data.text)
      .setTimestamp()
      .setFooter("This message will self-destruct in one minute");

   return data.message.channel.send(richEmbedMessage).then(msg =>
   {
      msg.delete(60000);
   });
}