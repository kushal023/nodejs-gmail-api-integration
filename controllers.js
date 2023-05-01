const axios = require('axios');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const sendGmail = require('./gmail.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const path = require('path');

require('dotenv').config();
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

async function sendMail(req, res) {
  try {
    const gmail = google.gmail({
      version: 'v1',
      auth: oAuth2Client,
    });

    // Convert the callback-based function to a promise-based function
    const listMessages = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
      labelIds: ['INBOX'],
      context: this.context, // Move the 'context' property inside the object
    });

    const response = listMessages;
    const messages = response.data.messages;

    if (messages.length === 0) {
      res.send('No new emails.');
      return;
    }

    // Iterate over emails and send replies to those without prior replies
    for (const message of messages) {
      const email = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'full',
      });

      const headers = email.data.payload.headers;
      const fromEmail = headers.find(
        (header) => header.name === 'From'
      ).value;
      const threadId = email.data.threadId;

      // Check if email thread has prior replies
      const thread = gmail.users.threads.get({
        userId: 'me',
        id: threadId,
      });

      const options = {
        from: process.env.EMAIL_FROM,
        to: fromEmail,
        subject: 'Auto Reply',
        text: req.body.text,
      };

      await sendGmail(options);
      // Add label to the email and move it to the labeled category
      const labelName = 'INBOX'; // Replace with your desired label name

      // Check if the label exists
      const labels = await gmail.users.labels.list({
        userId: 'me',
      });
      const label = labels.data.labels.find(
        (lbl) => lbl.name === labelName
      );
    }
    res.send('Replies sent successfully.');
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

module.exports = {
  sendMail,
};
