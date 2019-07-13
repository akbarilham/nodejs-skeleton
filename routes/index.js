var express = require('express');
var db = require('../config/db');
var router = express.Router();
var batchController = require("../controllers/batchController");
var balanceController = require("../controllers/balanceController");

router.post('/', function(req, res){
  console.log("masuk");
});

router.post('/example', function(req, res){
  console.log("example of jade");
});

router.post('/hit', function(req, res) {
  batchController.chargeBatchStart(req,res);
});

router.post('/query', function(req, res) {
  batchController.chargeProcessQuery(req,res);
});

router.get('/balance', function(req, res) {
  balanceController.balanceInfoList(req,res);
});

router.get('/test-db', function(req, response) {
  	db.manual.query('SELECT * FROM cellum.t_account', (err, res) => {
  		// console.log(err, res)
  		response.json(res.rows);
	});
});

module.exports = router;
