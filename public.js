const publicIp = require('public-ip');
 
publicIp.v4().then(ip => {
    console.log(ip);
    //=> '46.5.21.123' 
   });
    // 
     publicIp.v6().then(ip => {
         console.log(ip);
    //         //=> 'fe80::200:f8ff:fe21:67cf' 
             });
