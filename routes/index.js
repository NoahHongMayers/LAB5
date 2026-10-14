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

// Add items
itemList.add(new Item(1, "Clavier", 25.99));
itemList.add(new Item(2, "Souris", 15.99));
itemList.add(new Item(3, "Écran", 149.99));

// Homepage
router.get('/', function(req, res, next) {
    res.render('pages/index', {
        title: 'Accueil',
        items: itemList.tab
    });
});

module.exports = router;