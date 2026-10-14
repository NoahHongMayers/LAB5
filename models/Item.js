
class Item {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.creationDate = new Date().toLocaleDateString('en-US');
    }
}

module.exports = Item;