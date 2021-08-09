"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import all dependencies, mostly using destructuring for better view.
const bot_sdk_1 = require("@line/bot-sdk");
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const PORT = process.env.PORT || 3000;
// Create a new LINE SDK client.
const client = new bot_sdk_1.Client(config_1.clientConfig);
// Create a new Express application.
const app = express_1.default();
const botMessage = (msg) => {
    switch (msg) {
        case 'อายุ':
            return 'หนูอายุ 17 ปีค่ะ ^.^';
        case 'สมาชิกในวง':
            return 'Itzy มีสมาชิกทั้งหมด 5 คนค่ะ';
        default:
            return 'หนูไม่รู้จะตอบว่าไงดีงะ';
    }
};
// Function handler to receive the text.
const textEventHandler = async (event) => {
    // Process all variables here.
    if (event.type !== 'message' || event.message.type !== 'text') {
        return;
    }
    // Process all message related variables here.
    const { replyToken } = event;
    const text = botMessage(event.message.text);
    // Create a new message.
    const response = {
        type: 'text',
        text,
    };
    // Reply to the user.
    await client.replyMessage(replyToken, response);
};
// Route handler to receive webhook events.
// This route is used to receive connection tests.
app.get('/', async (_, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Connected successfully!',
    });
});
// This route is used for the Webhook.
app.post('/webhook', bot_sdk_1.middleware(config_1.middlewareConfig), async (req, res) => {
    const events = req.body.events;
    // Process all of the received events asynchronously.
    const results = await Promise.all(events.map(async (event) => {
        try {
            await textEventHandler(event);
        }
        catch (err) {
            // Return an error message.
            return res.status(500).json({
                status: 'error',
                msg: err.message
            });
        }
    }));
    // Return a successfull message.
    return res.status(200).json({
        status: 'success',
        results,
    });
});
// Create a server and listen to it.
app.listen(PORT, () => {
    console.log(`Application is live and listening on port ${PORT}`);
});
