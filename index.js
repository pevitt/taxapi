'use strict';

var restify = require('restify');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var admin = require("firebase-admin");

var serviceAccount = require("./appfirebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://appfirebase-9953b.firebaseio.com"
});


// Initialize the default app
var defaultAuth = admin.auth();

var port = process.env.PORT || 3000;

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
})

/*var db_config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "tax"
};*/

var db_config = {
  host: "69.87.220.221",
  user: "admin_pehamr",
  password: "Jimmy.ascacc31130724",
  database: "admin_tax_pupilo"
};

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

      defaultAuth.verifyIdToken(token).then(function(decodedToken) {

        console.log("TOKEN: ",decodedToken);

        return next();

      }).catch(function(error) {
        
        return res.json({ success: false, message: error });

      });

    } else {
      res.send(500,{ 
          success: false, 
          message: 'No token provided.' 
      });
      return next(false);
    }
});

require('./user')(server, db_config);
require('./personalProfile')(server, db_config);
require('./unemployment.js')(server, db_config);
require('./forminfo.js')(server, db_config);
require('./formspouse.js')(server, db_config);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});


