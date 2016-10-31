var express = require('express');
var router = express.Router();

/* GET seats listing. */
router.get('/', function(req, res) {
  res.send(req.user);
});

module.exports = router;
