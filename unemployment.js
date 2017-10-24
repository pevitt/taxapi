'use strict';

var mysql = require('mysql');
var formFunctions = require('./formsFunctions.js');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_form_unemployment';

  server.get('/unemployment/has/:userId/:Year', (req, res, next) => {

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

  server.get('/unemployment/has/:userId', (req, res, next) => {

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

  server.post('/unemployment/:userId', (req, res, next) => {
    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body.hasOwnProperty('Tsj') && req.body.Tsj  != "" && 
          req.body.hasOwnProperty('FormName') && req.body.FormName  != "" &&
          req.body.hasOwnProperty('Name') && req.body.Name  != "" && 
          req.body.hasOwnProperty('FirstName') && req.body.FirstName  != "" && 
          req.body.hasOwnProperty('LastName') && req.body.LastName  != "" && 
          req.body.hasOwnProperty('Street2') && req.body.Street2  != "" && 
          req.body.hasOwnProperty('City2') && req.body.City2  != "" && 
          req.body.hasOwnProperty('Compensation') && req.body.Compensation   != "" && 
          req.body.hasOwnProperty('CompRepaidYear') && req.body.CompRepaidYear   != "" && 
          req.body.hasOwnProperty('StateTaxCredits') && req.body.StateTaxCredits   != "" && 
          req.body.hasOwnProperty('TaxYear') && req.body.TaxYear   != "" && 
          req.body.hasOwnProperty('FederalTax') && req.body.FederalTax   != "" && 
          req.body.hasOwnProperty('RTAAPay') && req.body.RTAAPay   != "" && 
          req.body.hasOwnProperty('DFor') && req.body.DFor  != "" && 
          req.body.hasOwnProperty('Market') && req.body.Market  != "" && 
          req.body.hasOwnProperty('Mfc') && req.body.Mfc   != "" && 
          req.body.hasOwnProperty('Agriculture') && req.body.Agriculture   != "" && 
          req.body.hasOwnProperty('TaxGrants') && req.body.TaxGrants   != "" && 
          req.body.hasOwnProperty('TradeBussiness') && req.body.TradeBussiness  != "" && 
          req.body.hasOwnProperty('State') && req.body.State  != "" && 
          req.body.hasOwnProperty('StateID') && req.body.StateID  != "" && 
          req.body.hasOwnProperty('StateUnemploy') && req.body.StateUnemploy  != "" && 
          req.body.hasOwnProperty('StateHolding') && req.body.StateHolding  != "" && 
          req.body.hasOwnProperty('LocalPayment') && req.body.LocalPayment  != "" && 
          req.body.hasOwnProperty('LocalHolding') && req.body.LocalHolding  != "" && 
          req.body.hasOwnProperty('LocalityName') && req.body.LocalityName  != "")
      {

          var _sqlparams = [];

          _sqlparams.push(req.body.Tsj);
          _sqlparams.push(req.body.FormName);
          _sqlparams.push(req.body.Ein);
          _sqlparams.push(req.body.Name);
          _sqlparams.push(req.body.NameCont);
          _sqlparams.push(req.body.Street);
          _sqlparams.push(req.body.City);
          _sqlparams.push(req.body.FirstName);
          _sqlparams.push(req.body.LastName);
          _sqlparams.push(req.body.Street2);
          _sqlparams.push(req.body.City2);
          _sqlparams.push(req.body.Compensation ? req.body.Compensation : 0);
          _sqlparams.push(req.body.CompRepaidYear ? req.body.CompRepaidYear : 0);
          _sqlparams.push(req.body.StateTaxCredits ? req.body.StateTaxCredits : 0);
          _sqlparams.push(req.body.TaxYear ? req.body.TaxYear : 0);
          _sqlparams.push(req.body.FederalTax ? req.body.FederalTax : 0);
          _sqlparams.push(req.body.RTAAPay ? req.body.RTAAPay : 0);
          _sqlparams.push(req.body.DFor);
          _sqlparams.push(req.body.Market);
          _sqlparams.push(req.body.Mfc  ? req.body.Mfc : 0);
          _sqlparams.push(req.body.Agriculture  ? req.body.Agriculture : 0);
          _sqlparams.push(req.body.TaxGrants  ? req.body.TaxGrants : 0);
          _sqlparams.push(req.body.TradeBussiness  ? 1 : 0);
          _sqlparams.push(req.body.State);
          _sqlparams.push(req.body.StateID);
          _sqlparams.push(req.body.StateUnemploy);
          _sqlparams.push(req.body.StateHolding);
          _sqlparams.push(req.body.LocalPayment);
          _sqlparams.push(req.body.LocalHolding);
          _sqlparams.push(req.body.LocalityName);
          _sqlparams.push(req.body.Benefits);
          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.params.userId);
          _sqlparams.push(req.body.Year);
          
          //if record doesn't exist we create it
          //inserting new rpersonal profile
          var queryInsert = "INSERT INTO " + table + " (`Tsj`,`FormName`,`Ein`,`Name`,`NameCont`,`Street`,`City`,`FirstName`,`LastName`,`Street2`,`City2`,`Compensation`,`CompRepaidYear`,`StateTaxCredits`,`TaxYear`,`FederalTax`,`RTAAPay`,`DFor`,`Market`,`Mfc`,`Agriculture`,`TaxGrants`,`TradeBussiness`,`State`,`StateID`,`StateUnemploy`,`StateHolding`,`LocalPayment`,`LocalHolding`,`LocalityName`,`Benefits`,`FormInfoId`,`UserID`,`Year`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

          conectionDB();

          connection.query(queryInsert , _sqlparams, function (err, result, fields) {

            if (err){
              res.send(500, {message: err});
              connection.end();
              return next(false);
            }

            //LLAMAR A LA FUNCION
            connection.end();
            conectionDB();

            return formFunctions.insert_into_forms_detail (connection, req.params.userId, result.insertId, req.body.FormInfoId, res, next);

          });
        
     }else{    
        res.send(200, {success: false, message: "One of this fields has no value: FirstName,Minitial,LastName,JrSr,BirthDate,Ssn,Occupation,Address,Apt,City,State,Zip,PhoneNumber1,Ext1,StateResident,LivedAnother201,Tax,Legally,MaritalStatus,Spouse"});
        return next(false);
     }

    }else{
      res.send(200, {success: false, message: "User id is required"});
      return next(false);  
    }
    return next();
  });
  
  server.put('/unemployment/:unemploymentId', (req, res, next) => {
    if(req.params.unemploymentId && isInteger(req.params.unemploymentId) ){

      var _sqlparams = [];

      _sqlparams.push(req.body.Tsj);
      _sqlparams.push(req.body.FormName);
          _sqlparams.push(req.body.Ein);
          _sqlparams.push(req.body.Name);
          _sqlparams.push(req.body.NameCont);
          _sqlparams.push(req.body.Street);
          _sqlparams.push(req.body.City);
          _sqlparams.push(req.body.FirstName);
          _sqlparams.push(req.body.LastName);
          _sqlparams.push(req.body.Street2);
          _sqlparams.push(req.body.City2);
          _sqlparams.push(req.body.Compensation ? req.body.Compensation : 0);
          _sqlparams.push(req.body.CompRepaidYear ? req.body.CompRepaidYear : 0);
          _sqlparams.push(req.body.StateTaxCredits ? req.body.StateTaxCredits : 0);
          _sqlparams.push(req.body.TaxYear ? req.body.TaxYear : 0);
          _sqlparams.push(req.body.FederalTax ? req.body.FederalTax : 0);
          _sqlparams.push(req.body.RTAAPay ? req.body.RTAAPay : 0);
          _sqlparams.push(req.body.DFor);
          _sqlparams.push(req.body.Market);
          _sqlparams.push(req.body.Mfc  ? req.body.Mfc : 0);
          _sqlparams.push(req.body.Agriculture  ? req.body.Agriculture : 0);
          _sqlparams.push(req.body.TaxGrants  ? req.body.TaxGrants : 0);
          _sqlparams.push(req.body.TradeBussiness  ? 1 : 0);
          _sqlparams.push(req.body.State);
          _sqlparams.push(req.body.StateID);
          _sqlparams.push(req.body.StateUnemploy);
          _sqlparams.push(req.body.StateHolding);
          _sqlparams.push(req.body.LocalPayment);
          _sqlparams.push(req.body.LocalHolding);
          _sqlparams.push(req.body.LocalityName);
          _sqlparams.push(req.body.Benefits);
          _sqlparams.push(req.params.unemploymentId);
   
      var queryInsert = "UPDATE " + table + " SET `Tsj` = ?,`FormName` = ?, `Ein` = ?, `Name` = ?, `NameCont` = ?, `Street` = ?, `City` = ?, `FirstName` = ?, `LastName` = ?, `Street2` = ?, `City2` = ?, `Compensation` = ?, `CompRepaidYear` = ?, `StateTaxCredits` = ?, `TaxYear` = ?, `FederalTax` = ?, `RTAAPay` = ?, `DFor` = ?, `Market` = ?, `Mfc` = ?, `Agriculture` = ?, `TaxGrants` = ?, `TradeBussiness` = ?, `State` = ?, `StateID` = ?, `StateUnemploy` = ?, `StateHolding` = ?, `LocalPayment` = ?, `LocalHolding` = ?, `LocalityName` = ?,`Benefits` = ? WHERE `Id` = ?;";

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
      res.send(200, {success: false, message: "The unemployment id is required"});
      return next(false);  
    }
    return next();
  });

  server.del('/unemployment/:formId/:userId', (req, res, next) => {
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

