require('dotenv').config();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function sendEmail(to, subject, text, html) {
  const msg = {
    to: to,
    from: process.env.SENDGRID_FROM,
    subject: subject,
    text: text,
    html: html,
  }

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
    })
    .catch((error) => {
      console.error(error)
    })
}

module.exports = {
  sendEmail,
};
