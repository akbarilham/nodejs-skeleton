var winston = require('winston'); 
var moment = require("moment");
var log = require('../config/log');


/* File log writer */
const write = new (winston.Logger)({
	transports: [
	  new (winston.transports.Console)(),
	  new (winston.transports.File)({ filename: log.DIR + log.NAME, timestamp : moment(new Date()).format("YYYY-MM-DD HH:mm:ss") })
	]
});

module.exports =  write ;