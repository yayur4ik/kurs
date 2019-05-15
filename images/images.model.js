const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    gameId: { type: Schema.ObjectId, required: true},
    imgUri: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Image', schema);