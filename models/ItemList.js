
class ItemList {
    constructor() {
        this.tab = [];
    }

    add(item) {
        this.tab.push(item);
    }

    getLength() {
        return this.tab.length;
    }

    removeItemById(id) {
        let index = this.tab.findIndex(item => item.id == id);

        if (index !== -1) {
            this.tab.splice(index, 1);
            return 1;
        }

        return 0;
    }

    removeItemByName(nom) {
        let index = this.tab.findIndex(item => item.nom === nom);

        if (index !== -1) {
            this.tab.splice(index, 1);
            return 1;
        }

        return 0;
    }

    getLastItemId() {
        if (this.tab.length === 0) {
            return 0;
        }

        return this.tab[this.tab.length - 1].id;
    }
}

module.exports = ItemList;
