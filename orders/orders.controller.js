const express = require('express');
const router = express.Router();
const ordersService = require('./orders.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

router.get('/', authorize(Role.Admin),getOrders);     // public route
router.post('/', authorize(), addOrder); // admin only
router.post('/:id', authorize(Role.Admin),approveOrder);

module.exports = router;

function addOrder(req, res, next) {
    ordersService.addOrder(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function getOrders(req, res, next){
    ordersService.getAll()
    .then(orders => res.json(orders))
    .catch(err=> next(err))
}
function approveOrder(req,res, next){
    ordersService.approveOrder(req.params.id)
    .then(()=>  res.json({}))
    .catch(err=> next(err))
}