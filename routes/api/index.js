const express = require('express');
const router = express.Router();

// Index Route
router.get('/', function(req, res, next) {
    res.json({ message: "Welcome to the api, please read the read.me file for information on how to use this api." });
});

router.get('/get/:data', function(req, res, next) {

    let data = req.params.data

    res.json({ message: `you got all data for ${data}` });

});

module.exports = router;