const db = require('_helpers/db');
const Order = db.Order;
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

module.exports = {
    addOrder,
    getAll,
    approveOrder
};

async function getAll() {
    return await Order.find().select('-hash');
}
async function approveOrder(id){
    const order = await Order.findById(id);
    order.status = "Approved";
    order.save();
}
async function addOrder(param){
    const order = new Order(param);
    await order.save();
}