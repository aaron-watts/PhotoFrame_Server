const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");
const imageFetch = require('../controllers/fetch');

let routes = app => {
    router.get("/", homeController.getHome);

    router.get('/images', imageFetch.fetchFiles);

    router.post("/upload", upload.single("file"), uploadController.uploadFiles);

    return app.use("/", router);
};

module.exports = routes;