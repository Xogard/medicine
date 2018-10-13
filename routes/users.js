var express = require('express');
var fs      = require('fs')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Olá');
});

module.exports = router;
