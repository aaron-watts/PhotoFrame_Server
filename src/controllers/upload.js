const fs = require("fs");

const db = require("../models");
const Image = db.images;

const uploadFiles = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        Image.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(
                __basedir + "/resources/static/assets/tmp/" + req.file.filename
            ),
        }).then((image) => {
            fs.writeFileSync(
                `${__basedir}/resources/static/assets/uploads/${image.id}_${image.name}`,
                image.data
            );

            fs.rmSync(`${__basedir}/resources/static/assets/tmp/${image.name}`);

            return res.send(`File has been uploaded.`);
        });
    } catch (err) {
        console.log(err);
        return res.send(`Erroro when trying to upload images: ${err}`);
    }
};

module.exports = {
    uploadFiles
};