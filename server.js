const express = require('express');
var bodyParser = require('body-parser');
require('./src/config/index');
var router = require("./src/router/index")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(router);
app.listen(4000, () => {
    console.log('app is running on 4000 port')
});