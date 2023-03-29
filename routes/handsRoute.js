var express = require('express');
var hands = express.Router();
var handsService = require('../services/handsService');

hands.post('/winningHands', function (req, res) {
    let handsData = req.body;
    handsService.winningHands(handsData, function (response) {
        res.send(response);
    });
});

module.exports = hands;