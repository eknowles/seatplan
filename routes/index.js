var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  if (!req.query.token) {
    return res.render('anon');
  }
});

module.exports = router;
