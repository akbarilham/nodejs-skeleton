const moment = require("moment");
const async = require('async');

const db = require("../config/db");
const panggil = require("../library/Winston.js");

var balance = (function(){

	var balanceInfoList = function(request, response){ 

		var BalanceInfoItems = [];
		var data = '';

		let select = "SELECT * FROM cellum.t_account ORDER BY account_id ASC";
  		db.manual.query(select, (err, res) => {
  			var newObjects = res.rows;
  			panggil.info("<-- Start function of Balance Info");

  			async.forEach(newObjects, function (item, callback){ 

	  			var AccountId = item.account_id;
	  			var BalanceAmount = item.balance;

				data = {
					"AccountId": AccountId,
					"BalanceAmount": BalanceAmount,
					"BalanceQueriedAt": "2017-11-06T03:00:41.6939521Z"
				}

				BalanceInfoItems.push(data);

			}, function(err) {
				panggil.error("<-- Balance Info error : " + err)
			});

			response.json({"BalanceInfoItems": BalanceInfoItems});
			panggil.info("<-- Balance info data was pushed");
			panggil.info("<-- End function of Balance Info");
		});

	}

	return {
		balanceInfoList
	}

})();

module.exports = balance;