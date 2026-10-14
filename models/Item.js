/**
 * @file     Item.js
 * @author   Noah Hong Mayers | 202430525@edu.clg.qc.ca
 * @version  1.0
 * @date     October 10 2026
 * @brief    item class
 */

class Item {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.creationDate = new Date().toLocaleDateString('en-US');
    }
}

module.exports = Item;//export item class