const crypto = require('crypto');
const PubSub = require('@google-cloud/pubsub');
const sseChannel = require('sse-channel');
const config = require('config');

const pubsub = PubSub({ projectId: config.get('project.id') });

const subscribe = pubsub.subscription(config.get('pubsub.subscription'));

const channel = new sseChannel({
    historySize: 20,
    cors: {
        origins: '*'
    }
});

subscribe.on('message', msg => {
    msg.ack();

    const data = msg.data.toString('utf8');

    channel.send({
        data: data,
        id: crypto.createHash('md5').update(data).digest('hex')
    });
});

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    return channel.addClient(req, res);
}
