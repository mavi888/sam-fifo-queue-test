const AWS = require('aws-sdk')
AWS.config.update({region: 'us-west-2'})
const sqs = new AWS.SQS({apiVersion: '2012-11-05'})

const QUEUE_NAME = process.env.QUEUE_NAME;

const send = async (groupId, messageId) => {
  return await sqs.sendMessage({
    MessageGroupId: `group-${groupId}`,
    MessageDeduplicationId: `m-${groupId}-${messageId}`,
    MessageBody: `${messageId}`,
    QueueUrl: QUEUE_NAME
  }).promise()
}

exports.hello = async (event) => {
  
  console.log(QUEUE_NAME);
  await send ('A', '1');

  return {
    statusCode: 200,
    body: JSON.stringify(event),
    headers: {}
  }
}