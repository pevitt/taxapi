'use strict';

var restify = require('restify');
var jwtr = require('restify-jwt');
var jwt = require('jsonwebtoken');
var cors = require('cors');

var port = process.env.PORT || 3000;

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
})

var db_config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "tax"
};

// var db_config = {
//   host: "69.87.220.221",
//   user: "admin_pehamr",
//   password: "Jimmy.ascacc31130724",
//   database: "admin_tax_pupilo"
// };

var secretToken = '1d=5YA@t_d/+_E%h';

server.use(restify.plugins.bodyParser());

server.pre(cors());

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
      res.send(500,{ 
          success: false, 
          message: 'No token provided.' 
      });
      return next(false);
    }
});

require('./user')(server, db_config, secretToken);
require('./personalProfile')(server, db_config);
require('./unemployment.js')(server, db_config);
require('./forminfo.js')(server, db_config);
require('./formspouse.js')(server, db_config);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});


