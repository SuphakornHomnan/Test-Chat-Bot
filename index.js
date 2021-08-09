// Import all dependencies, mostly using destructuring for better view.
import { Client, middleware } from "@line/bot-sdk";
import express from "express";

// Setup all LINE client and Express configurations.
const clientConfig = {
  channelAccessToken: process.env.LINE_BOT_CHANNEL_TOKEN || "",
  channelSecret: process.env.LINE_BOT_CHANNEL_SECRET,
};

const middlewareConfig = {
  channelAccessToken: process.env.LINE_BOT_CHANNEL_TOKEN,
  channelSecret: process.env.LINE_BOT_CHANNEL_SECRET || "",
};

const PORT = process.env.PORT || 3000;

// Create a new LINE SDK client.
const client = new Client(clientConfig);

// Create a new Express application.
const app = express();

// Function handler to receive the text.
const textEventHandler = async (event) => {
  // Process all variables here.
  if (event.type !== "message" || event.message.type !== "text") {
    return;
  }

  // Process all message related variables here.
  const { replyToken } = event;
  const { text } = event.message;

  // Create a new message.
  const response = {
    type: "text",
    text,
  };

  // Reply to the user.
  await client.replyMessage(replyToken, response);
};

// Register the LINE middleware.
// As an alternative, you could also pass the middleware in the route handler, which is what is used here.
// app.use(middleware(middlewareConfig));

// Route handler to receive webhook events.
// This route is used to receive connection tests.
app.get("/", async (_, res) => {
  return res.status(200).json({
    status: "success",
    message: "Connected successfully!",
  });
});

// This route is used for the Webhook.
app.post("/webhook", middleware(middlewareConfig), async (req, res) => {
  const events = req.body.events;

  // Process all of the received events asynchronously.
  const results = await Promise.all(
    events.map(async (event) => {
      try {
        await textEventHandler(event);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err);
        }

        // Return an error message.
        return res.status(500).json({
          status: "error",
        });
      }
    })
  );

  // Return a successfull message.
  return res.status(200).json({
    status: "success",
    results,
  });
});

// Create a server and listen to it.
app.listen(PORT, () => {
  console.log(`Application is live and listening on port ${PORT}`);
});