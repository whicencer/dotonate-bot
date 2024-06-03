require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.ADMIN_BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

const bot = new TelegramBot(TOKEN);

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  if (chatId == ADMIN_CHAT_ID) {
    bot.sendMessage(chatId, "Hello, dear admin", {
      reply_markup:  {
        keyboard: [
          [{ text: "Get all users started Dotonate with landing" }]
        ]
      }
    });
  }

  return;
});

bot.onText(/Get all users started Dotonate with landing/, (msg) => {
  const chatId = msg.chat.id;

  if (chatId == ADMIN_CHAT_ID) {
    bot.sendDocument(chatId, "landing_users.json");
  }

  return;
});

bot.startPolling();