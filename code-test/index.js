const apiai = require("apiai");
const express = require("express");
let app = express();
const bodyParser = require("body-parser");
const uuid = require("uuid");
const axios = require('axios');

//Import Config file
const config = require("./config");

//setting Port
app.set("port", process.env.PORT || 5000);

//serve static files in the public directory
app.use(express.static("public"));

// Process application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Process application/json
app.use(bodyParser.json());

// Index route
app.get("/", function (req, res) {
  res.send("Hello world, I am a chat bot");
});

// for Facebook verification
app.get("/webhook/", function (req, res) {
  console.log("request");
  if (
    req.query["hub.mode"] === "subscribe" &&
    req.query["hub.verify_token"] === config.FB_VERIFY_TOKEN
  ) {
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

// Spin up the server
app.listen(app.get("port"), function () {
  console.log("Magic Started on port", app.get("port"));
});


const apiAiService = apiai(config.API_AI_CLIENT_ACCESS_TOKEN, {
    language: "en",
    requestSource: "fb"
  });
const sessionIds = new Map();

/*
 * All callbacks for Messenger are POST-ed. They will be sent to the same
 * webhook. Be sure to subscribe your app to your page to receive callbacks
 * for your page. 
 * https://developers.facebook.com/docs/messenger-platform/product-overview/setup#subscribe_app
 *
 */
app.post("/webhook/", function (req, res) {
    var data = req.body;
    // Make sure this is a page subscription
    if (data.object == "page") {
      // Iterate over each entry
      // There may be multiple if batched
      data.entry.forEach(function (pageEntry) {
        var pageID = pageEntry.id;
        var timeOfEvent = pageEntry.time;
  
        // Iterate over each messaging event
        pageEntry.messaging.forEach(function (messagingEvent) {
          if (messagingEvent.message) {
            receivedMessage(messagingEvent);
          } else {
            console.log("Webhook received unknown messagingEvent: ",messagingEvent);
          }
        });
      });
      // Assume all went well.
      // You must send back a 200, within 20 seconds
      res.sendStatus(200);
    }
});

function receivedMessage(event) {
    console.log(event);
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;
  
    if (!sessionIds.has(senderID)) {
      sessionIds.set(senderID, uuid.v1());
    }
  
    var messageId = message.mid;
    var appId = message.app_id;
    var metadata = message.metadata;
  
    // You may get a text or attachment but not both
    var messageText = message.text;
    var messageAttachments = message.attachments;
  
    if (messageText) {
      //send message to api.ai
      sendToApiAi(senderID, messageText);
    } else if (messageAttachments) {
      console.log("there are message attachments");
      // handleMessageAttachments(messageAttachments, senderID);
    }
  }

  function sendToApiAi(sender, text) {
    // sendTypingOn(sender);
    let apiaiRequest = apiAiService.textRequest(text, {
      sessionId: sessionIds.get(sender)
    });
  
    apiaiRequest.on("response", response => {
      if (isDefined(response.result)) {
        console.log("there ")
        // handleApiAiResponse(sender, response);
      }
    });
  
    apiaiRequest.on("error", error => console.error(error));
    apiaiRequest.end();
  }

