const db = require('../models');
const Image = db.images;

const fetchFiles = async (req, res) => {
    try {
        const images = await Image.findAll();

        return res.send(images);
    } catch (err) {
        console.log(err);
        return res.send(`Error when trying to fetch images: ${err}`);
    }
};

module.exports = {
    fetchFiles
};