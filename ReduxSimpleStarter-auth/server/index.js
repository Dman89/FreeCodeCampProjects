const express = require('express');
const http = require('http');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const app = express();
const router = require('./router')
const db = require('./database')

app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);





const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server Listening on localhost:' + port);
