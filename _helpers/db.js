const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Game: require('../games/games.model'),
    Image: require('../images/images.model'),
    Order: require('../orders/orders.model'),
    Developer: require('../developer/developer.model'),
    Publisher: require('../publisher/publisher.model')
};