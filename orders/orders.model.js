const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    userId: { type: Schema.ObjectId, required: true},
    gamesId: { type: Array, required: true},
    email: {type: String, required: true},
    status: {type: String, required: true, default: 'New'}
});
schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Order', schema);