const PubSub = require('@google-cloud/pubsub');
const sseChannel = require('sse-channel');
const config = require('config');

const pubsub = PubSub({ projectId: config.get('project.id') });

const subscribe = pubsub.subscription(config.get('pubsub.subscription'));

const channel = new sseChannel();

subscribe.on('message', msg => {
    msg.ack();

    channel.send(msg.data.toString('utf8'));
});

module.exports = (req, res) => channel.addClient(req, res);
