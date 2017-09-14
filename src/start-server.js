require('@google-cloud/trace-agent').start();

const micro = require('micro');
const { send } = require('micro');
const { router, get, post } = require('microrouter');

const notification = require('./routes/notification');
const { list, upload } = require('./routes/images');

const notfound = (req, res) => send(res, 404, 'Not found route');

module.exports = function startServer(port) {
    return micro(
        router(
            get('/notification', notification),
            get('/images/list', list),
            post('/images/upload', upload),
            get('/*', notfound)
        )
    ).listen(port);
};
