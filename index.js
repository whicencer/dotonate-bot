require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Hello, this is Dotonate bot!", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Let's get started", web_app: { url: 'https://dotonate.vercel.app/' } }]
      ]
    }
  });
});

bot.startPolling();