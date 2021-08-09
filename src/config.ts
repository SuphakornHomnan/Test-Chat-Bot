import { ClientConfig, MiddlewareConfig } from '@line/bot-sdk'
// Setup all LINE client and Express configurations.
export const clientConfig: ClientConfig = {
    channelAccessToken: process.env.LINE_BOT_CHANNEL_TOKEN || '',
    channelSecret: process.env.LINE_BOT_CHANNEL_SECRET,
};

export const middlewareConfig: MiddlewareConfig = {
    channelAccessToken: process.env.LINE_BOT_CHANNEL_TOKEN,
    channelSecret: process.env.LINE_BOT_CHANNEL_SECRET || '',
};