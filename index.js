require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const {
  getUsersStatistics,
  getDonationsStatistics
} = require("./statistics");
const db = require("./db");

const TOKEN = process.env.DEV_BOT_TOKEN;

const bot = new TelegramBot(TOKEN);

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const params = msg.text.split(' ')[1];
  const viaLanding = params === "landing";

  db.addUser({
    username: msg.from.username,
    userId: msg.from.id,
    isPremium: msg.from.is_premium,
    viaLanding
  })

  bot.sendMessage(chatId, "Hello, this is Dotonate bot!\nSubscribe to our channel @dotonatenews", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Let's get started", web_app: { url: process.env.DOTONATE_URL } }]
      ]
    }
  });
});

bot.onText(/\/stat/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (userId !== process.env.ADMIN_CHAT_ID) {
    return bot.sendMessage(chatId, "🚫 This command is not for you :(");
  }

  const { 
    usersADay,
    usersAMonth,
    usersAWeek,
    usersLength,
    usersWithPremium,
    usersWithLanding
  } = await getUsersStatistics();
  const { donationsCount, donationsCountADay } = await getDonationsStatistics();

  const stat = `☑️ <b>Статистика:</b>  
├ 🌎 <b>Пользователей:</b> ${usersLength}
├ 📅 <b>За эту неделю:</b> ${usersAWeek}
├ 📆 <b>За этот месяц:</b> ${usersAMonth}
├ 📈 <b>За сегодня:</b> ${usersADay}
├ 🚀 <b>С лендинга:</b> ${usersWithLanding}
└ 🌟 <b>Пользователи с премиумом:</b> ${usersWithPremium}

💸 <b>Информация о пожертвованиях:</b>
├ 📊 <b>Всего:</b> ${donationsCount}
└ 📈 <b>За сегодня:</b> ${donationsCountADay}
`;

  bot.sendMessage(chatId, stat, {
    parse_mode: "HTML"
  });
});

bot.on("polling_error", console.log);
bot.startPolling();