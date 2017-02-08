const Slack = require('slack-node');

const SendSlackMessage = function (message) {

  const webhookUrl = 'https://hooks.slack.com/services/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';


  const slack = new Slack();
  slack.setWebhook(webhookUrl);

  slack.webhook({
    channel: "#rasppi_test",
    username: "Raspberry Pi Test",
    text: message,
  }, function (err, response) {
    // console.log(response);
  });

};

module.exports = SendSlackMessage;