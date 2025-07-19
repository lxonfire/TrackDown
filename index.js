const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const token = '6833010165:AAF306yZpVoLWm4xpZNkmzM0pSh6ZbB0cEY'; // 🔁 Replace with your actual bot token

const bot = new TelegramBot(token, { webHook: true });

app.use(bodyParser.json());

// ✅ Set webhook URL (must be HTTPS)
const WEBHOOK_URL = `https://takaincome.vercel.app/bot${token}`;
bot.setWebHook(WEBHOOK_URL);

// 📩 Webhook endpoint to receive Telegram updates
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// 🔁 Echo incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  bot.sendMessage(chatId, `Echo: ${text}`);
});

// ✅ Start the Express server
app.listen(3000, () => {
  console.log('🚀 Bot server running on port 3000');
});
