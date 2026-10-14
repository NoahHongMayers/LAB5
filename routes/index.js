/**
 * @file     index.js
 * @author   Noah Hong Mayers | 202430525@edu.clg.qc.ca
 * @version  1.0
 * @date     October 10 2026
 * @brief    Client side configuration
 */

var express = require('express');
var router = express.Router();

const Item = require('../models/Item');
const ItemList = require('../models/ItemList');

const client = require('../mqttClient');//import mqtt client object

// Create the list
var itemList = new ItemList();

//render Homepage
router.get('/', function (req, res, next) {
    res.render('pages/index', {
        items: itemList.array,// Pass the array of items to the rendered view
        passedError: req.query.errorMessage// Pass the error message to the rendered view
    });
});

router.post('/add', function (req, res) {
    let id = itemList.getLastItemId() + 1;
    let name = req.body.name;
    let price = parseFloat(req.body.price);

    let item = new Item(id, name, price);
    let date = item.creationDate;
    itemList.add(item);

    client.publish('ITEM/WEB/NEW', id.toString() + '\n' + date.toString() + '\n' + name + '\n' + price.toString());

    res.redirect('/');
});

router.post('/removeId', function (req, res) {
    let id = Number(req.body.id);
    let result = itemList.removeItemById(id);
    if (result == 0) {
        console.log("Item ID not found");
        res.redirect('/?errorMessage=Item ID not found');
    } else{
        client.publish('ITEM/WEB/DELETE/ID', id.toString());
        res.redirect('/');
    }

});

router.post('/removeName', function (req, res) {
    let name = req.body.name;
    let result = itemList.removeItemByName(name);
    if (result == 0) {
        console.log("Item name not found.");
        res.redirect('/?errorMessage=Item name not found');
    } else{
        client.publish('ITEM/WEB/DELETE/NAME', name);
        res.redirect('/');
    }
});


module.exports = router;
module.exports.itemList = itemList;//export itemList object