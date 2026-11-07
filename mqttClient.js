/**
 * @file    mqttClient.js
 * @author  Noah Hong Mayers | 202430525@edu.clg.qc.ca
 * @version 1.0
 * @date    October 10 2026
 * @brief   mqtt client 
 */

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1:1883'); // Instance du client MQTT
const Item = require('./models/Item');

// Fonction pour initialiser les écouteurs avec itemList et io
function initMqtt(itemList, io) {
    client.on('connect', function () {
        console.log('MQTT Connected');
        client.subscribe('ITEM/MODULE/#');
    });

    client.on('message', function (topic, message) {
        console.log(topic, message.toString());
        let msgStr = message.toString();

        if (topic == 'ITEM/MODULE/NEW') {
            let parts = msgStr.split('\n');
            let id = itemList.getLastItemId() + 1;
            let name = parts[0];
            let price = parseFloat(parts[1]);

            let item = new Item(id, name, price);
            itemList.add(item);
        }
        else if (topic == 'ITEM/MODULE/DELETE/ID') {
            let id = parseInt(msgStr);
            itemList.removeItemById(id);
        }
        else if (topic == 'ITEM/MODULE/DELETE/NAME') {
            itemList.removeItemByName(msgStr);
        }
        else if (topic == 'ITEM/MODULE/MODIFY') {
            let parts = msgStr.split('\n');
            let id = Number(parts[0]);
            let name = parts[1];
            let price = parseFloat(parts[2]);

            itemList.modifyItem(id, name, price);
        }
        else {
            console.log('Unknown topic: ' + topic);
        }

        if (io) {
            io.emit('refresh');
        }
    });
}

// On exporte à la fois l'instance 'client' et la fonction d'initialisation
module.exports = { client, initMqtt };