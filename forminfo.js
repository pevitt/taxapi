'use strict';

var mysql = require('mysql');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_forms_info';

  
  server.get('/forminfo/byname/:Name', (req, res, next) => {

      var query = "SELECT * FROM " + table + " where NameForm = ?";

      conectionDB();

      connection.query(query , [req.params.Name] , function (err, result, fields) {
        
        if (err){
          res.send(500, {message: err});
          connection.end();
          return next(false);
        }
        
        if(result != undefined && result[0] != undefined){
          res.json({success:true , hasdata: true , data: result});
          connection.end();
          return next();
        }else{
          //missin parameter
          res.json({success:true , hasdata: false});
          connection.end();
          return next();
        }

      });

    return next();
  });

  server.get('/forminfo/', (req, res, next) => {

      var query = "SELECT * FROM " + table;

      conectionDB();

      connection.query(query , [] , function (err, result, fields) {
        
        if (err){
          res.send(500, {message: err});
          connection.end();
          return next(false);
        }
        
        if(result != undefined && result[0] != undefined){
          res.json({success:true , hasdata: true , data: result});
          connection.end();
          return next();
        }else{
          //missin parameter
          res.json({success:true , hasdata: false});
          connection.end();
          return next();
        }

      });

    return next();
  });

  server.get('/forminfo/has/:FormId', (req, res, next) => {

    if(req.params.FormId && isInteger(req.params.FormId) ){

      var query = "SELECT * FROM " + table + " where Id = ?";

      conectionDB();

      connection.query(query , [req.params.userId], function (err, result, fields) {
        
        if (err){
          res.send(500, {message: err});
          connection.end();
          return next(false);
        }
        
        if(result != undefined && result[0] != undefined){
          res.json({success:true , hasdata: true , data: result});
          connection.end();
          return next();
        }else{
          //missin parameter
          res.json({success:true , hasdata: false});
          connection.end();
          return next();
        }

      });

    }else{
      res.send(200, {success: false, message: "Param must be a number"});
      return next(false);  
    }
    return next();
  });

  
  
  server.put('/forminfo/:FormInfoId', (req, res, next) => {
    if(req.params.FormInfoId && isInteger(req.params.FormInfoId) ){

      var _sqlparams = [];

          // _sqlparams.push(req.body.Id);
          // _sqlparams.push(req.body.NameForm);
          _sqlparams.push(req.body.Amount);
          // _sqlparams.push(req.body.Status);
          _sqlparams.push(req.params.FormInfoId);
   
      var queryInsert = "UPDATE " + table + " SET `Amount` = ? WHERE `Id` = ?;";

      conectionDB();

      connection.query(queryInsert , _sqlparams, function (err, result, fields) {

        if (err){
          res.send(500, {message: err});
          connection.end();
          return next(false);
        }

        res.send(200, {success: true, message:"Updated successfully"});

        connection.end();

        return next(false);
      });            

    } else{
      res.send(200, {success: false, message: "The Form id is required"});
      return next(false);  
    }
    return next();
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

  function isInteger(str){
    var reg = /^\d+$/;
    return reg.test(str);
  }

};

