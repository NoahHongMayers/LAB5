
class Item {
    constructor(id, nom, prix) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.dateCreation = new Date().toLocaleDateString('en-US');
    }
}

module.exports = Item;