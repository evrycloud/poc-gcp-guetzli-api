const PubSub = require('@google-cloud/pubsub');
const sseChannel = require('sse-channel');
const config = require('config');

const pubsub = PubSub({ projectId: config.get('project.id') });

const subscribe = pubsub.subscription(config.get('pubsub.subscription'));

const channel = new sseChannel({
    cors: { origins: '*' }
});

subscribe.on('message', msg => {
    msg.ack();

    channel.send(msg.data.toString('utf8'));
});

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    return channel.addClient(req, res);
}
