const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");
const imageFetch = require('../controllers/fetch');
const deleteController = require('../controllers/delete');

let routes = app => {
    

    router.get('/images', imageFetch.fetchFiles);

    router.post("/upload", upload.single("file"), uploadController.uploadFiles);

    router.delete('/:id', deleteController.deleteFile);

    router.get("/", homeController.getHome);

    return app.use("/", router);
};

module.exports = routes;