var express = require('express');
var docs = express.Router();
var docsService = require('../services/docsService');

docs.get('/readme', function (req, res) {
    let docsData = req.body;
    docsService.readme(docsData, function (response) {
        res.send(response);
    });
});

module.exports = docs;