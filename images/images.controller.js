const express = require('express');
const router = express.Router();
const imageService = require('./image.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

router.post('/add', authorize(Role.Admin), AddImage);
module.exports = router;

function AddImage(req, res, next) {
    imageService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}