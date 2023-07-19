require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
require('./src/config/index');
const router = require("./src/router/userRoutes");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(router);
app.listen(process.env.PORT, () => {
    console.log('app is running on 4000 port')
});