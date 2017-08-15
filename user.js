'use strict';

var mysql = require('mysql');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

module.exports = function(server, db_config, secret){

  var connection; 
  var table = 'tx_user';

  server.post('/user/login/', (req, res, next) => {
    
    if(req.body != undefined){
      if( req.body.hasOwnProperty('email')){
      
        if(req.body.email != "" ){

          var query = "Select * From " + table + " WHERE email = ?";

          conectionDB();

          connection.query(query , [req.body.email], function (err, result, fields) {
            connection.end();
            if (err){
              res.send(500, {message: err});
              return next(false);
            }

            if(result != undefined && result[0] != undefined){
                var user = result[0];

                res.json({
                  success: true,
                  message: 'logged in successfully!',
                  id: user.id
                });

              
            }else{
              //user dont exist so we create a new one 
              var query = "INSERT INTO " + table + " (`email`) VALUES (?);";
              conectionDB();

              connection.query(query , [req.body.email], function (err, result, fields) {
        
                if (err){
                  res.send(500, {message: err});
                  connection.end();
                  return next(false);
                }
                
               res.json({
                  success: true,
                  message: 'logged in successfully!',
                  id: result.insertId
                });

                connection.end();

                return next(false);
              });
            }
            
            connection.end();

            return next(false);
          });

        }else{
          //data cant be null
          res.send(200, {success:false, message:"Data can't be null"});
        }
      }else{
        //missin parameter
        res.send(200, {success:false, message:"Missing parameters"});
      }
    }else{
      //missin parameter
        res.send(200, {success:false, message:"Wrong format"});
    }

    return next(false);
  });

  function conectionDB(){
      
    connection = mysql.createConnection(db_config);
    connection.connect(function(err) {              
      if(err) {                                     
        console.log('error when connecting to db:', err);
        throw err; 
      }                                     
    }); 

    connection.on('error', function(err) {
      console.log('db error', err.code);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        conectionDB();                         
      } else {                                      
        throw err;                                  
      }
    });                               
  }

  /**
   * generates random string of characters i.e salt
   * @function
   * @param {number} length - Length of the random string.
   */
  var genRandomString = function(length){
      return crypto.randomBytes(Math.ceil(length/2))
              .toString('hex') /** convert to hexadecimal format */
              .slice(0,length);   /** return required number of characters */
  };

  /**
   * hash password with sha512.
   * @function
   * @param {string} password - List of required fields.
   * @param {string} salt - Data to be validated.
   */
  var sha512 = function(password, salt){
      var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
      hash.update(password);
      var value = hash.digest('hex');
      return {
          salt:salt,
          passwordHash:value
      };
  };

};

