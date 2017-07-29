'use strict';

var restify = require('restify');
var jwtr = require('restify-jwt');
var jwt = require('jsonwebtoken');
var port = process.env.PORT || 3000;

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
})

var db_config = {
  host: "69.87.220.221",
  user: "admin_pehamr",
  password: "Jimmy.ascacc31130724",
  database: "admin_tax_pupilo"
};

var secretToken = '1d=5YA@t_d/+_E%h';

server.use(restify.plugins.bodyParser());


function unknownMethodHandler(req, res) {
  if (req.method.toLowerCase() === 'options') {
      console.log('received an options method request');
    var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With']; // added Origin & X-Requested-With

    if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
    res.header('Access-Control-Allow-Methods', res.methods.join(', '));
    res.header('Access-Control-Allow-Origin', req.headers.origin);

    return res.send(204);
  }
  else
    return res.send(new restify.MethodNotAllowedError());
}

server.on('MethodNotAllowed', unknownMethodHandler);

server.use(function (req, res, next){
    if(req.url == '/user/create/' ||  req.url == '/user/login/'){
        return next();
    }

    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, secretToken, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: err });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;  
          return next();
        }
      });
    } else {
      //avoid create user and login

 
      // if there is no token
      // return an error
      return res.send(500,{ 
          success: false, 
          message: 'No token provided.' 
      });

    }
});



  

require('./user')(server,db_config,secretToken);
require('./formW2')(server,db_config);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});


