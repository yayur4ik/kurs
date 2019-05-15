const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    devId: { type: Schema.ObjectId},
    pubId: { type: Schema.ObjectId},
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    imgUri: { type: String, required: true },
    price: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Game', schema);