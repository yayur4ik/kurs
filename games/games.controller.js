const express = require('express');
const router = express.Router();
const authorize = require('_helpers/authorize')
const gameService = require('./games.service');
const Role = require('_helpers/role');
router.get('/games', getAll);
router.get('/publisher/:publ', getAllWithPubs);
router.get('/developer/:dev', getAllWithDevs);
router.get('/games/:id', getImages);
router.post('/games/:id',authorize(Role.Admin), updateInfo);
router.post('/games',authorize(Role.Admin),createNewGame);
router.get('/title/:title',getByTitle)
router.post('/:id',getImages);

module.exports = router;
function getAllWithPubs(req, res, next){
    gameService.getAllWithPubs(req.params.publ)
    .then(games => res.json(games))
    .catch(err => next(err));
}
function getAllWithDevs(req, res, next){
    gameService.getAllWithDevs(req.params.dev)
    .then(games => res.json(games))
    .catch(err => next(err));
}
function getAll(req, res, next) {
    gameService.getAll()
        .then(games => res.json(games))
        .catch(err => next(err));
}
function getByTitle(req,res,next){
    gameService.getByTitle(req.params.title)
    .then(games => res.json(games))
    .catch(err => next(err));
}
function getImages(req, res,next){
    gameService.getImages(req.params.id)
    .then(games => res.json(games))
    .catch(err => next(err));
}
function updateInfo(req,res,next){
    gameService.update(req.params.id,req.body)
    .then(games => res.json(games))
    .catch(err => next(err));
}
function createNewGame(req, res, next) {
    gameService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function getById(req, res, next) {
    gameService.getById(req.params.id)
        .then(games => games ? res.json(games):res.json())
        .catch(err => next(err));
}