/**
 * @file     ItemList.js
 * @author   Noah Hong Mayers | 202430525@edu.clg.qc.ca
 * @version  1.0
 * @date     October 10 2026
 * @brief    itemList class
 */

class ItemList {
    constructor() {
        this.array = [];
    }

    add(item) {
        this.array.push(item);
    }

    getLength() {
        return this.array.length;
    }

    removeItemById(id) {
        let index = this.array.findIndex(item => item.id == id);

        if (index != -1) {
            this.array.splice(index, 1);
            return 1;
        }

        return 0;
    }

    removeItemByName(name) {
        let index = this.array.findIndex(item => item.name === name);

        if (index != -1) {
            this.array.splice(index, 1);
            return 1;
        }

        return 0;
    }

    getLastItemId() {
        if (this.array.length == 0) {
            return 0;
        }

        return this.array[this.array.length - 1].id;
    }

    modifyItem(id, name, price) {
        let item = this.array.find(function (item) {
            return item.id == id;
        }
        );

        if (item) {
            item.name = name;
            item.price = price;
            return 1;
        }

        return 0;
    }
}

module.exports = ItemList;//export itemlist class
