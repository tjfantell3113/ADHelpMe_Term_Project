const compression = require('compression');
const express = require('express');

const path = require('path');
const https = require("https"),
    fs = require("fs");

const options = {
  key: fs.readFileSync(__dirname + "/srv/key.pem"),
  cert: fs.readFileSync(__dirname + "/srv/cert.pem")
}

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
}

/*CORS stands for Cross Origin Resource Sharing and allows modern web browsers to be able to send AJAX requests and receive HTTP responses for resource from other domains other that the domain serving the client side application.*/
const cors = require('cors');

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');

// Our JWT logic. Uses express-jwt which is a middleware that validates JsonWebTokens and sets req.user.
const jwt = require('./_helpers/jwt');


// Our error handler
const errorHandler = require('./_helpers/error-handler');

const FrontEndPath = '../../ADHelpMe_FrontEnd/dist/ADHelpMe';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression({filter: shouldCompress}));;
app.use(cors());
app.use('/', express.static(path.join(__dirname + FrontEndPath)));
app.use(jwt());
app.use('/user', require('./routes/user.router'));
app.use('/quiz', require('./routes/quiz.router'))
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3030;
app.listen(port, function () {
  console.log('Server listening on port ' + port);
});

https.createServer(options, app).listen(4000);

