const {
    PORT = 3000,
    STORAGE_UNCOMPRESSED = 'uncompressed-images-demo',
    STORAGE_COMPRESSED = 'compressed-images-demo',
    PROJECT_ID = 'guetzli-179112',
    SUBSCRIPTION = 'compressed-image-sub'
} = process.env;

module.exports = {
    port: PORT,
    project: {
        id: PROJECT_ID
    },
    storage: {
        uncompressed: STORAGE_UNCOMPRESSED,
        compressed: STORAGE_COMPRESSED
    },
    pubsub: {
        subscription: SUBSCRIPTION,
    }
};
