const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const token = '6833010165:AAF306yZpVoLWm4xpZNkmzM0pSh6ZbB0cEY'; // 🔁 Replace with your actual bot token

const bot = new TelegramBot(token, { webHook: true });

app.use(bodyParser.json());


// Endpoint to set webhook automatically using request host
app.get('/setup', (req, res) => {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const webhookUrl = `${protocol}://${host}/bot${token}`;
  bot.setWebHook(webhookUrl)
    .then(() => res.send(`Webhook set to: ${webhookUrl}`))
    .catch(err => res.status(500).send(`Error setting webhook: ${err.message}`));
});

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
