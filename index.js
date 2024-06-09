require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN);

const landingFile = 'landing_users.json';

// Функция для добавления пользователя в файл
function addUserToLanding(user) {
  let data = [];
  try {
    // Чтение существующего файла
    if (fs.existsSync(landingFile)) {
      const fileData = fs.readFileSync(landingFile, 'utf8');
      data = JSON.parse(fileData);
    }

    const newUser = {
      id: user.id,
      name: `${user.first_name || ''} ${user.last_name || ''}`,
      telegramId: user.id,
      date: new Date()
    };

    data.push(newUser);

    // Сохранение обновленных данных в файл
    fs.writeFileSync(landingFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error handling landing file:', error);
  }
}

bot.onText(/\/start(?: (.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const parameter = match[1]; // Дополнительный параметр

  if (parameter) {
    if (parameter === "landing") {
      addUserToLanding(msg.from);
    }
  }

  bot.sendMessage(chatId, "Hello, this is Dotonate bot!\nSubscribe to our channel @dotonatenews", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Let's get started", web_app: { url: 'https://dotonate.vercel.app/' } }]
      ]
    }
  });
});

bot.startPolling();