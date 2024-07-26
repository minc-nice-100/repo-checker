const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

async function checkPublicRepositoryChanges() {
  const owner = 'minc-nice-100';
  const repo = 'repo-checker';
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`);
  const data = await response.json();

  const latestCommitSHA = data[0].sha;

  // Add your logic to compare the latest commit SHA with the previously stored SHA
  // If there are new commits, send an email notification
  // Example: if (latestCommitSHA !== storedCommitSHA) { sendEmailNotification(); }
}

async function sendEmailNotification() {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'robot@ited.top',
    to: 'admin@ited.top',
    subject: 'Public Repository Changes Notification',
    text: 'There are new changes in the public repository. Please review.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email notification sent: ' + info.response);
    }
  });
}

checkPublicRepositoryChanges();
