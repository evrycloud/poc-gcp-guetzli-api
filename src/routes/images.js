const Storage = require('@google-cloud/storage');
const { send } = require('micro');
const { upload, move } = require('micro-upload');
const config = require('config');

const storage = Storage();

module.exports = {
    upload: upload(async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');

        const {
            files
        } = req;

        const images = Array.isArray(files.images) ? files.images : [files.images];

        if (!images.length) {
            return send(res, 400, 'No file found.');
        }

        // mimetype is not reliable.
        for (i = 0; i < images.length; i++) {
            const image = images[i];

            if (
                ['image/jpeg', 'image/png'].indexOf(image.mimetype) === -1
            ) {
                return send(res, 415, 'Unsupported file format');
            }

            const path = `/tmp/${image.name}`;

            try {
                await move(image, path);

                await storage.bucket(config.get('storage.uncompressed')).upload(path);
            } catch (error) {
                console.error(error);

                return send(res, 503, 'We had issues with your upload.');
            }
        }

        return send(res, 200, 'Image successfully uploaded.');
    }),

    list: async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');

        const files = await storage.bucket(config.get('storage.compressed')).getFiles();

        if (!files.length) {
            return send(res, 404, 'Not found');
        }

        return send(res, 200, files[0].map(file => {
            // lol, find an better approach
            const {
                size,
                contentType,
                id,
                name,
                mediaLink,
                selfLink,
                timeCreated,
                updated
            } = file.metadata;

            return {
                size,
                contentType,
                id,
                name,
                mediaLink,
                selfLink,
                timeCreated,
                updated
            };
        }));
    }
};
