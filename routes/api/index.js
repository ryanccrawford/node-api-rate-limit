const express = require('express');
const router = express.Router();

// root route
router.get('/', function(req, res) {
    res.json({ message: "Welcome to the api, please read the read.me file for information on how to use this api." });
});

// our get data with arbitrary parameter 
router.get('/get/:data', function(req, res) {

    let data = req.params.data

    res.json({ message: `you got all data for /get/${data}` });

});

module.exports = router;