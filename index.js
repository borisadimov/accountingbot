const { v4: uuidV4 } = require('uuid')
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const Airtable = require('airtable');
require('dotenv').config();

console.log(process.env)
const {PORT, AIRTABLE_API_KEY, AIRTABLE_BASE_ID, TELEGRAM_BOT_TOKEN} = process.env;

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

bot.launch({
    webhook: {
      domain: 'whale-app-8nwsl.ondigitalocean.app',
      port: PORT
    },
  });


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
