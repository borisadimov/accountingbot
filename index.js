const { v4: uuidV4 } = require('uuid')
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const Airtable = require('airtable');
require('dotenv').config();

const {AIRTABLE_API_KEY, AIRTABLE_BASE_ID, TELEGRAM_BOT_TOKEN} = process.env;

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: AIRTABLE_API_KEY
});

var base = Airtable.base(AIRTABLE_BASE_ID);

// Set up a new Telegram bot
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// When the bot receives a new message, save it to Airtable
bot.on(message('text'), (ctx) => {
    base('Maik').create([
        {
          "fields": {
            "Message Text": ctx.message.text,
            "Username": ctx.message.from.username
          }
        }
      ], function(err, records) {
        if (err) {
          console.error(err, records);
          return;
        }
      });    
});

// bot.launch({
//     webhook: {
//       // Public domain for webhook; e.g.: example.com
//       domain: webhookDomain,
  
//       // Port to listen on; e.g.: 8080
//       port: port,
  
//       // Optional path to listen for.
//       // `bot.secretPathComponent()` will be used by default
//       hookPath: webhookPath,
  
//       // Optional secret to be sent back in a header for security.
//       // e.g.: `crypto.randomBytes(64).toString("hex")`
//       secretToken: randomAlphaNumericString,
//     },
//   });


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));


const express = require('express');
const app = express();

// get our port
const port = process.env.PORT || 3000;

// applicaton code goes here

// have node listen on our port
app.listen(port, () => console.log(`App listening on port ${port}!`));