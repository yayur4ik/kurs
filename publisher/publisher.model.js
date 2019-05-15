const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    publisher: { type: String, required: true, unique: true}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Publisher', schema);