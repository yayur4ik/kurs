const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
// routes
router.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '../', 'index.html'));
})
router.get('/logout',function(req,res){
    res.sendFile(path.join(__dirname, '../public/Views/', 'logout.html'));
})
router.get('/login', function(req,res){
    res.sendFile(path.join(__dirname, '../public/Views/', 'login.html'));
})
router.get('/catalog', function(req,res){
    res.sendFile(path.join(__dirname, '../public/Views/', 'catalog.html'));
})
router.get('/cart', function(req,res){
    res.sendFile(path.join(__dirname, '../public/Views/', 'cart.html'));
})
router.get('/register', function(req,res){
    res.sendFile(path.join(__dirname, '../public/Views/', 'registerpage.html'));
})
router.get('/admin', function(req,res){
    res.sendFile(path.join(__dirname, '../public/Views/', 'initial.html'));
})
router.get('/checkout', function(req,res){
    res.sendFile(path.join(__dirname, '../public/Views/', 'checkout.html'));
})
router.get('/success', function(req,res){
    res.sendFile(path.join(__dirname, '../public/Views/', 'success.html'));
})
router.post('/success', function(req,res){
    var obj = {
        table: []
     };
     obj.table.push(req.body);
     var json = JSON.stringify(obj);
     fs.writeFile('myjsonfile.json', json, 'utf8', md);
     return fs;
})
router.get('/order', function(req,res){
    res.sendFile(path.join(__dirname, '../public/Views/', 'orders.html'));
})
router.get('/games/*', function(req,res){
    res.sendFile(path.join(__dirname, '../public/Views/', 'modify.html'));
})
router.get('/catalog/*', function(req,res){
    res.sendFile(path.join(__dirname, '../public/Views/', 'gamepage.html'));
})

md = () =>{
    console.log('d');
}
module.exports = router;
