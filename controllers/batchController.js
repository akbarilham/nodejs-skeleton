var validate = require("validate.js");
var validator = require("validator");
var moment = require("moment");
const async = require('async');

var db = require("../config/db");
var yona = require("../library/Yona.js");
var naomi = require("../library/Naomi.js");
var Model = require("../model/totalExternalID");
var panggil = require("../library/Winston.js");

var batch = (function(){

	var chargeBatchStart = function(request, response){ 

		// Declaration of JSON Object 
		var ChargeRequests  = request.body.ChargeRequests;
		var arrAccountId = [];
		var checkErr = '';
		panggil.info("<-- Start function of Batch Start");

		async.forEach(ChargeRequests, function (item, callback){ 

		var AccountId = item.User.AccountId;
		let select = "SELECT count(account_id) FROM cellum.t_account WHERE account_id = '" + AccountId + "'";
	  	db.manual.query(select, (err, res) => {

			// validation start
			panggil.info("<-- Batch Start validation is started");
			var ExternalId 		= item.ExternalId;
			var MerchantId		= item.Merchant.MerchantId;
			var TerminalId		= item.Merchant.TerminalId;
			var AccountId		= item.User.AccountId;
			var AppTypeId		= item.User.AppTypeId;		
			var Amount 			= item.Charge.Amount;
			var CommissionFee 	= item.Charge.CommissionFee;
			var Description		= item.Charge.Description;
			var References		= item.Charge.References;

			checkErr	= yona.valid(ChargeRequests, 'chargerequests', 'FAILED_ERROR_TECHNICAL ChargeRequests - jumlah concurent tidak boleh lebih dari 100');
			checkErr	= yona.valid(ExternalId, 'externalid', 'FAILED_ERROR_TECHNICAL ExternalId - jumlah length lebih dari 40');
			checkErr 	= yona.valid(MerchantId, 'merchant.merchantid', 'FAILED_ERROR_TECHNICAL MerchantId - tipe data bukan int');
			checkErr 	= yona.valid(TerminalId, 'merchant.terminalid', 'FAILED_ERROR_TECHNICAL TerminalId - tipe data bukan int');
			checkErr 	= yona.valid(AccountId, 'user.accountid', 'FAILED_ERROR_TECHNICAL AccountId - jumlah string lebih dari 100');
			checkErr 	= yona.valid(AppTypeId, 'user.apptypeid', 'FAILED_ERROR_TECHNICAL AppTypeId - tipe data bukan integer');
			checkErr 	= yona.valid(Amount, 'charge.amount', 'FAILED_ERROR_TECHNICAL Amount - tipe data bukan decimal');
			checkErr	= yona.valid(CommissionFee, 'charge.commissionfee', 'FAILED_ERROR_TECHNICAL CommissionFee - tipe data bukan decimal');
			checkErr	= yona.valid(Description, 'charge.description', 'FAILED_ERROR_TECHNICAL Description - jumlah string lebih dari 255');
			// checkErr	= yona.valid(References, 'charge.references', 'FAILED_ERROR_TECHNICAL');
			// checkErr	= yona.valid(ReferenceKey, 'charge.references.referencekey', 'FAILED_ERROR_TECHNICAL Key - jumlah char lebih dari 20');
			// checkErr = yona.valid(ReferenceVal, 'charge.references.referenceval', 'FAILED_ERROR_TECHNICAL - jumlah string lebih dari 100');

	  		var checkAccountID = res.rows[0].count;

	  		if (checkErr !== 'OK'){

	  			panggil.error("<-- Batch Start error : " + checkErr);
				return callback({ error : checkErr});

	  		} 
	  		if (checkAccountID == 0) {

				panggil.error("<-- Batch Start error : " + checkErr);
	  			checkErr = 'FAILED_ERROR_TECHNICAL';
	  			return callback({ error : checkErr}); 

	  		}

				var CutDate = moment.utc().format();
				var Status = "success";

				let update = "UPDATE cellum.t_account SET balance = balance - " + Amount + " WHERE account_id = '" + AccountId + "'";

			  	db.manual.query(update, (err, res) => {

			  		panggil.info("<-- Batch Start update was success");

					let insert_trx = {
					  text: 'INSERT INTO cellum.t_account_trx(account_id, trx_amount, cmn_id, external_id, trx_date, status) VALUES($1, $2, $3, $4, $5, $6)',
					  values: [AccountId, Amount, '0e962417-7ed3-4d60-aff8-49b03bbdf31b', ExternalId, CutDate, Status],
					}

				  	db.manual.query(insert_trx, (err, res) => {
				  		panggil.info("<-- Batch Start insert was success");
					});

				});
				
		});		

		callback();

		}, function(err) {
			panggil.info("<-- Batch Start checking error ");
			if (checkErr == '') {

				response.json({'ResultCode' : 'OK'});
			    panggil.info("<-- End function of Batch Start");

			} else {

				response.json({'ResultCode' : checkErr});
			    panggil.error("<-- BS error : " + err);

			}
			checkErr = '';

		}); 

	};		

	var chargeProcessQuery = function(request, response){ 

		var ExternalId = request.body.ExternalIds;
	    Model(ExternalId,response);

	}

	return {
		chargeBatchStart,
		chargeProcessQuery
	}


})();

module.exports = batch;