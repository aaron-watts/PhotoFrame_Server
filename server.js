require('dotenv').config();
global.__basedir = __dirname;
const express = require("express");
const app = express();
const db = require("./src/models");
const initRoutes = require("./src/routes/web");

const methodOverride = require('method-override');

app.use(express.static('./resources/static'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
initRoutes(app);

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.")
// });

let port = 3000;
app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
});