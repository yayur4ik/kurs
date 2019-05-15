const db = require('_helpers/db');
const Publisher = db.Publisher;

module.exports = {
    create
};

async function create(Param) {
    const pub = new Publisher(Param);
    await pub.save();
}