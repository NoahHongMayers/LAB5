/**
 * @file     mqttClient.js
 * @author   Noah Hong Mayers | 202430525@edu.clg.qc.ca
 * @version  1.0
 * @date     October 10 2026
 * @brief    mqtt client 
 */

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1:1883');//create mqtt client object

module.exports = client;//export as client