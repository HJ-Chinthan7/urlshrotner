const Url = require('../models/url');
const shortid = require('shortid');
const validUrl = require('valid-url');


const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;
console.log("short url");
    if (!validUrl.isUri(originalUrl)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    try {
        let url = await Url.findOne({ originalUrl });
        if (url) {
            return res.json({
                originalUrl: url.originalUrl,
                shortUrl: url.shortUrl,
                urlCode: url.urlCode
            });
        }

        const urlCode = shortid.generate();
        const shortUrl = `${process.env.BASE_URL}/${urlCode}`;

        url = new Url({
            originalUrl,
            shortUrl,
            urlCode
        });

        await url.save();

        res.json({
            originalUrl: url.originalUrl,
            shortUrl: url.shortUrl,
            urlCode: url.urlCode
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const redirectUrl = async (req, res) => {
    const { urlCode } = req.params;

    try {
        const url = await Url.findOne({ urlCode });
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }
        url.clicks += 1;
        url.lastAccessed = new Date();
        await url.save();

        res.redirect(url.originalUrl);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = {
    shortenUrl,
    redirectUrl
};
