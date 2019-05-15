const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
const path = require('path');
// routes
router.post('/register', register);
router.post('/authenticate', authenticate);  
   // public route
router.get('/users', authorize(Role.Admin), getAll); // admin only
router.get('/admin', authorize(Role.Admin), adminPage);
router.get('/:id', authorize(), getById);    
router.post('/:token', getName); 


module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}
function adminPage(req, res, next){
    userService.getPage()
    .then(user => res.sendFile(path.join(__dirname, '../public/Views/', user)))
    .catch(err => next(err));
}
function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}
function getName(req, res, next){
    userService.getName(req.params.token)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}