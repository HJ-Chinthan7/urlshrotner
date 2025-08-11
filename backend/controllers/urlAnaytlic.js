const Url = require('../models/url');



const getAllAnalytics = async (req, res) => {
    try {
        const urls = await Url.find().select('originalUrl shortUrl clicks createdAt updatedAt');
        res.json(urls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getAllAnalytics
};
