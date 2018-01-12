'use strict';

var mysql = require('mysql');
var formFunctions = require('./formsFunctions.js');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_form_dependet';

  server.get('/form_dependent/has/:userId/:Year', (req, res, next) => {

    if(req.params.userId && isInteger(req.params.userId) ){

      var query = "SELECT * FROM " + table + " where UserId = ? AND Year = ?";

      conectionDB();
      var _sqlparams = [];

          _sqlparams.push(req.params.userId);
          _sqlparams.push(req.params.Year);

      connection.query(query , _sqlparams, function (err, result, fields) {
        
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

  server.get('/form_dependent/has/:userId', (req, res, next) => {

    if(req.params.userId && isInteger(req.params.userId) ){

      var query = "SELECT * FROM " + table + " where UserId = ?";

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

  server.post('/form_dependent/:userId', (req, res, next) => {
    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body.hasOwnProperty('firtname') && req.body.firtname != "" &&  
          req.body.hasOwnProperty('lastname') && req.body.lastname != "" &&  
          req.body.hasOwnProperty('ssn') && req.body.ssn != "")
      {

        
          var _sqlparams = [];

          _sqlparams.push(req.body.ssn);
          _sqlparams.push(req.body.firtname);
          _sqlparams.push(req.body.lastname);
          _sqlparams.push(req.body.relationship);
          _sqlparams.push(req.body.manymonth);
          _sqlparams.push(req.body.BirthDate);
          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.params.userId);
           _sqlparams.push(req.body.Year);

          console.log("insert child care: ",_sqlparams);

            //if record doesn't exist we create it
            //inserting new rpersonal profile
            var queryInsert = "INSERT INTO " + table + " (`ssn`,`firtname`,`lastname`,`relationship`,`manymonth`,`BirthDate`,`FormInfoId`,`UserID`, `Year`) VALUES (?,?,?,?,?,?,?,?,?);";

            conectionDB();

            connection.query(queryInsert , _sqlparams, function (err, result, fields) {

              if (err){
                res.send(500, {message: err});
                connection.end();
                return next(false);
              }

              //res.send(200, {success: true, message:"Inserted successfully"});

              connection.end();
              conectionDB();
              //return next(false);
              return formFunctions.insert_into_forms_detail (connection, req.params.userId, result.insertId, req.body.FormInfoId, res, next);
            });
          
          // END inserting new personal profil
        
        
     }else{    
          
          // console.log("req.body.hasOwnProperty('ssn') ",req.body.hasOwnProperty('ssn') );
          // console.log("req.body.ssn != '' ",req.body.ssn != "" );
          
          // console.log("req.body.hasOwnProperty('City') ",req.body.hasOwnProperty('City') );
          // console.log("req.body.City != '' ",req.body.City != "" );
          
          // console.log("req.body.hasOwnProperty('CareProvider') ",req.body.hasOwnProperty('CareProvider') );
          // console.log("req.body.CareProvider != '' ",req.body.CareProvider != "" );
          // console.log("req.body.hasOwnProperty('State') ",req.body.hasOwnProperty('State') );
          // console.log("req.body.State != '' ",req.body.State != "" );
          

          console.log(req.body);

        res.send(200, {success: false, message: "One of this fields has no value: First Name, Last Name, SSN"});
        return next(false);
     }

    }else{
      res.send(200, {success: false, message: "User Id is required"});
      return next(false);  
    }
    return next();
  });
  
  server.put('/form_dependent/:DependentID', (req, res, next) => {
    if(req.params.dependentID && isInteger(req.params.DependentID) ){

      var _sqlparams = [];

          _sqlparams.push(req.body.ssn);
          _sqlparams.push(req.body.firtname);
          _sqlparams.push(req.body.lastname);
          _sqlparams.push(req.body.relationship);
          _sqlparams.push(req.body.manymonth);
          _sqlparams.push(req.body.BirthDate);
         
          _sqlparams.push(req.params.DependentID);
   
      var queryUpdate = "UPDATE " + table + " SET `ssn` = ?,`firtname` = ?,`lastname` = ?,`relationship` = ?,`manymonth` = ?,`BirthDate` = ?  WHERE Id =  ?;";

      conectionDB();

      connection.query(queryUpdate , _sqlparams, function (err, result, fields) {

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
      res.send(200, {success: false, message: "The dependent id is required"});
      return next(false);  
    }
    return next();
  });

  server.del('/form_dependent/:formId/:userId', (req, res, next) => {
    conectionDB();
    return formFunctions.delRecord(req, res, next, table, connection);  
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
      /*if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        conectionDB();                         
      } else {                                      
        throw err;                                  
      }*/
    });                               
  }

  function isInteger(str){
    var reg = /^\d+$/;
    return reg.test(str);
  }

};

