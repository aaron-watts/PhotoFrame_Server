const fs = require('fs');

const db = require("../models");
const Image = db.images;

const deleteFile = async (req, res) => {
    try {
        const deleteImageId = req.params.id;
        const image = await Image.findOne({ where: { id: deleteImageId} });
        const filePath = '/resources/static/assets/uploads/';

        Image.destroy({
            where: {
                id: image.id
            }
        }).then(data => {
            fs.rmSync(`${__basedir}${filePath}${image.id}_${image.name}`);

            return res.send('delete request dealt with')
        })
    } catch (err) {
        console.log(err);
        return res.send(`Error trying to delete image: ${err}`);
    }

    
};

module.exports = {
    deleteFile
};