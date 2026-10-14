/**
 * @file     app.js
 * @author   Noah Hong Mayers | 202430525@edu.clg.qc.ca
 * @version  1.0
 * @date     September 22 2026
 * @brief    Skeleton for a Node.js application using Express framework
 */

var express = require('express');
var router = express.Router();

const Item = require('../models/Item');
const ItemList = require('../models/ItemList');

// Create the list
var itemList = new ItemList();

//render Homepage
router.get('/', function(req, res, next) {
    res.render('pages/index', {
        items: itemList.array,// Pass the array of items to the rendered view
    });
});

router.post('/add', function(req, res) {
    let id = itemList.getLastItemId() + 1;
    let name = req.body.name;
    let price = parseFloat(req.body.price);

    let item = new Item(id, name, price);

    itemList.add(item);
    res.redirect('/');
});

router.post('/removeId', function(req, res) {
    let id = Number(req.body.id);
    itemList.removeItemById(id);
    res.redirect('/');
});

router.post('/removeName', function(req, res) {
    let name = req.body.name;
    itemList.removeItemByName(name);
    res.redirect('/');
});
module.exports = router;