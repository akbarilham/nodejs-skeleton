module.exports = {
	
	valid: function(naomi, nadse, citra) {

		var yona = naomi;

		/*** Javascript encasulaption ***/
		// validation protected
		if (typeof yona === 'string'){
			yona = yona.replace(/^\s+$/, '');
		} 

		// validation private
		if (nadse === 'chargerequests'){
			if (yona.length > 100)
				return citra;
		}

		if (nadse === 'externalid'){
			if (yona.length > 40)
				return citra;
		}

		if (nadse === 'condition'){
			return citra;
		}

			if (nadse === 'condition.new'){
				if (yona !== 'new')
					return citra;
			}

			if (nadse === 'condition.update'){
				if (yona !== 'update')
					return citra
			}

		if (nadse === 'merchant.merchantid'){
			if (typeof yona !== 'number')
				return citra;
		}

		if (nadse === 'merchant.terminalid'){
			if (typeof yona !== 'number')
				return citra;
		}

		if (nadse === 'user.accountid'){
			if (yona.length > 100)
				return citra;
		}

		if (nadse === 'user.apptypeid'){
			if (yona.length > 100)
				return citra;
		}

		if (nadse === 'charge.amount'){
			if (typeof yona !== 'number')
				return citra;
		}

		if (nadse === 'charge.commissionfee'){
			if (typeof yona !== 'number')
				return citra;
		}

		if (nadse === 'charge.description'){
			if (yona.length > 255)
				return citra;
		}

		// if (nadse === 'charge.references'){
		// 	if (yona.length === '')
		// 		return "OK";
		// 	else if (yona.length > 0)
		// 		return "optional";
		// }

		// if (nadse === 'charge.references.referencekey'){
		// 	if (yona.length > 20 && typeof yona === 'string')
		// 		return citra;
		// }

		// if (nadse === 'charge.references.referenceval'){
		// 	if (yona.length > 100 && typeof yona === 'string')
		// 		return citra;
		// }

		// validation public
		switch (yona){

			case null:
				return 'FAILED_ERROR_TECHNICAL ' + nadse + ' data tidak boleh kosong';

			case undefined:
				return 'FAILED_ERROR_TECHNICAL ' + nadse + ' data tidak boleh kosong';

			case yona.length === 0:
				return 'FAILED_ERROR_TECHNICAL ' + nadse + ' data tidak boleh kosong';

			case '':
				return 'FAILED_ERROR_TECHNICAL ' + nadse + ' data tidak boleh kosong';

			default:
				return "OK";
		}

	}

}