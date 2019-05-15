const db = require('_helpers/db');
const Developer = db.Developer;

module.exports = {
    create
};

async function create(Param) {
    const dev = new Developer(Param);
    await dev.save();
}