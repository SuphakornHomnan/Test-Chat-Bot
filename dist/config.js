"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareConfig = exports.clientConfig = void 0;
// Setup all LINE client and Express configurations.
exports.clientConfig = {
    channelAccessToken: process.env.LINE_BOT_CHANNEL_TOKEN || '',
    channelSecret: process.env.LINE_BOT_CHANNEL_SECRET,
};
exports.middlewareConfig = {
    channelAccessToken: process.env.LINE_BOT_CHANNEL_TOKEN,
    channelSecret: process.env.LINE_BOT_CHANNEL_SECRET || '',
};
