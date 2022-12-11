const Telegraf = require('telegraf');
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
bot.on('message', (ctx) => {
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

bot.launch();