const express = require('express');
const http = require('http');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const app = express();
const router = require('./router_user')
const componentRouter = require('./router_component')
const db = require('./database')
const cors = require('cors')
app.use(morgan('combined'));
app.use(cors()); // Allows CORS(Cross Origin GET Request)
app.use(bodyParser.json({type: '*/*'}));
componentRouter(app);
router(app);





const port = process.env.PORT || 8080;
// const server = http.createServer(app);
app.listen(port, function() {
  console.log('Server Listening on localhost:' + port);
});
