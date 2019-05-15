require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
// api routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', require('./users/users.controller'));
app.use('/catalog', require('./games/games.controller'));
app.use('/images', require('./images/images.controller'));
app.use('/orders', require('./orders/orders.controller'));
app.use('/', require('./controller/index.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
