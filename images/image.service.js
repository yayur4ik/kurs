const config = require('config.json');
const db = require('_helpers/db');
const Image = db.Image;

module.exports = {
    create
};

async function create(Param) {
    const image = new Image(Param);
    await image.save();
}