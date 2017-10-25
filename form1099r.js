'use strict';

var mysql = require('mysql');
var formFunctions = require('./formsFunctions.js');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_form_1099r';

  server.get('/form_1099r/has/:userId/:Year', (req, res, next) => {
    conectionDB();
    return formFunctions.getByUserNYear(req, res, next, table, connection);
    
  });

  server.get('/form_1099r/has/:userId', (req, res, next) => {
    conectionDB();
    return formFunctions.getByUser(req, res, next, table, connection);
    
  });

  server.post('/form_1099r/:userId', (req, res, next) => {

    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body != undefined &&
          req.body.hasOwnProperty('ts') && req.body.ts != "" &&
          req.body.hasOwnProperty('ein') && req.body.ein != "" &&
          req.body.hasOwnProperty('Name') && req.body.Name != "" &&  
          req.body.hasOwnProperty('Street') && req.body.Street != "" &&
          req.body.hasOwnProperty('City') && req.body.City != "" &&
          req.body.hasOwnProperty('ZipCode') && req.body.ZipCode != "" && 
          req.body.hasOwnProperty('State') && req.body.State != "" 
          )
      {

        
          var _sqlparams = loadData(req.body);

          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.params.userId);
          _sqlparams.push(req.body.Year);
            //if record doesn't exist we create it
            //inserting new rpersonal profile
            var queryInsert = "INSERT INTO " + table + " (`ts`, `ein`, `Name`, `NameContinued`, `Street`, `City`, `State`, `ZipCode`, `FirstName1`, `LastName1`, `Street1`, `City1`, `State1`, `ZipCode1`, `GrossDis`, `TaxAmount`, `CapitalGain`, `EmployContri`, `FederalTax`, `Unrealized`, `DistCode1`, `DistCode2`, `IsaSep`, `TaxPayer`, `Other`, `OtherPer`, `TaxPayerPerTotal`, `TotalEmployee`, `AmountIrr`, `FirstYear`, `Fatca`, `AccountNumber`, `Statetax1`, `Statetax2`, `LocalTax1`, `LocalTax2`, `State11`, `PayerState11`, `State2`, `PayerState2`, `Locality1`, `Locality2`, `StateDistribution1`, `StateDistribution2`, `LocalDistribution1`, `LocalDistribution2`, `FormName`,`FormInfoId`,`UserId`,`Year`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

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
          
        var fields = "";
         
        if(req.body == undefined){
          fields += "ts, ein, Name, Street, City, ZipCode, State";
         
        }else{
          if(!(req.body.hasOwnProperty('ts') && req.body.ts != ""))
            fields += "ts";
          
          
          if(!(req.body.hasOwnProperty('ein') && req.body.ein != "")){
            if(fields != "")
              fields += ", "
            fields += "ein";
          }

          if(!(req.body.hasOwnProperty('Name') && req.body.Name != "")){
            if(fields != "")
              fields += ", "
            fields += "Name";
          }

          if(!(req.body.hasOwnProperty('Street') && req.body.Street != "")){
            if(fields != "")
              fields += ", "
            fields += "Street";
          }

          if(!(req.body.hasOwnProperty('City') && req.body.City != "")){
            if(fields != "")
              fields += ", "
            fields += "City";
          }

          if(!(req.body.hasOwnProperty('ZipCode') && req.body.ZipCode != "" )){
            if(fields != "")
              fields += ", "
            fields += "ZipCode";
          }

          if(!(req.body.hasOwnProperty('State') && req.body.State != "")){
            if(fields != "")
              fields += ", "
            fields += "State";
          }

          
        }

        res.send(200, {success: false, message: "One of this fields has no value: " + fields});
        return next(false);
     }

    }else{
      res.send(200, {success: false, message: "User Id is required"});
      return next(false);  
    }
    return next();
  });
  
  server.put('/form_1099r/:form1099rID', (req, res, next) => {
    if(req.params.form1099rID && isInteger(req.params.form1099rID) ){

      var _sqlparams = loadData(req.body);
         
      _sqlparams.push(req.params.form1099rID);

      var queryUpdate = "UPDATE " + table + " SET `ts` = ?, `ein` = ?, `Name` = ?, `NameContinued` = ?, `Street` = ?, `City` = ?, `State` = ?, `ZipCode` = ?, `FirstName1` = ?, `LastName1` = ?, `Street1` = ?, `City1` = ?, `State1` = ?, `ZipCode1` = ?, `GrossDis` = ?, `TaxAmount` = ?, `CapitalGain` = ?, `EmployContri` = ?, `FederalTax` = ?, `Unrealized` = ?, `DistCode1` = ?, `DistCode2` = ?, `IsaSep` = ?, `TaxPayer` = ?, `Other` = ?, `OtherPer` = ?, `TaxPayerPerTotal` = ?, `TotalEmployee` = ?, `AmountIrr` = ?, `FirstYear` = ?, `Fatca` = ?, `AccountNumber` = ?, `Statetax1` = ?, `Statetax2` = ?, `LocalTax1` = ?, `LocalTax2` = ?, `State11` = ?, `PayerState11` = ?, `State2` = ?, `PayerState2` = ?, `Locality1` = ?, `Locality2` = ?, `StateDistribution1` = ?, `StateDistribution2` = ?, `LocalDistribution1` = ?, `LocalDistribution2` = ?, `FormName` = ? WHERE `Id` = ?";

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
      res.send(200, {success: false, message: "The form1099r  id is required"});
      return next(false);  
    }
    return next();
  });

  server.del('/form_1099r/:formId/:userId', (req, res, next) => {
    conectionDB();
    return formFunctions.delRecord(req, res, next, table, connection);  
  });

  function loadData(body){

    var _sqlparams = [];  

    _sqlparams.push(body.ts ? body.ts : "");
    _sqlparams.push(body.ein ? body.ein : "");
    _sqlparams.push(body.Name ? body.Name : "");
    _sqlparams.push(body.NameContinued ? body.NameContinued : "");
    _sqlparams.push(body.Street ? body.Street : "");
    _sqlparams.push(body.City ? body.City : "");
    _sqlparams.push(body.State ? body.State : "");
    _sqlparams.push(body.ZipCode ? body.ZipCode : "");
    _sqlparams.push(body.FirstName1 ? body.FirstName1 : "");
    _sqlparams.push(body.LastName1 ? body.LastName1 : "");
    _sqlparams.push(body.Street1 ? body.Street1 : "");
    _sqlparams.push(body.City1 ? body.City1 : "");
    _sqlparams.push(body.State1 ? body.State1 : "");
    _sqlparams.push(body.ZipCode1 ? body.ZipCode1 : "");
    _sqlparams.push(body.GrossDis  ? body.GrossDis : 0);
    _sqlparams.push(body.TaxAmount  ? body.TaxAmount : 0);
    _sqlparams.push(body.CapitalGain  ? body.CapitalGain : 0);
    _sqlparams.push(body.EmployContri  ? body.EmployContri : 0);
    _sqlparams.push(body.FederalTax  ? body.FederalTax : 0);
    _sqlparams.push(body.Unrealized  ? body.Unrealized : 0);
    _sqlparams.push(body.DistCode1 ? body.DistCode1 : "");
    _sqlparams.push(body.DistCode2 ? body.DistCode2 : "");
    _sqlparams.push(body.IsaSep ? 1 : 0 );
    _sqlparams.push(body.TaxPayer  ? body.TaxPayer : 0);
    _sqlparams.push(body.Other  ? body.Other : 0);
    _sqlparams.push(body.OtherPer  ? body.OtherPer : 0);
    _sqlparams.push(body.TaxPayerPerTotal  ? body.TaxPayerPerTotal : 0);
    _sqlparams.push(body.TotalEmployee  ? body.TotalEmployee : 0);
    _sqlparams.push(body.AmountIrr  ? body.AmountIrr : 0);
    _sqlparams.push(body.FirstYear  ? body.FirstYear : 0);
    _sqlparams.push(body.Fatca ? 1 : 0 );
    _sqlparams.push(body.AccountNumber ? body.AccountNumber : "");
    _sqlparams.push(body.Statetax1  ? body.Statetax1 : 0);
    _sqlparams.push(body.Statetax2  ? body.Statetax2 : 0);
    _sqlparams.push(body.LocalTax1  ? body.LocalTax1 : 0);
    _sqlparams.push(body.LocalTax2  ? body.LocalTax2 : 0);
    _sqlparams.push(body.State11 ? body.State11 : "");
    _sqlparams.push(body.PayerState11  ? body.PayerState11 : 0);
    _sqlparams.push(body.State2 ? body.State2 : "");
    _sqlparams.push(body.PayerState2  ? body.PayerState2 : 0);
    _sqlparams.push(body.Locality1 ? body.Locality1 : "");
    _sqlparams.push(body.Locality2 ? body.Locality2 : "");
    _sqlparams.push(body.StateDistribution1  ? body.StateDistribution1 : 0);
    _sqlparams.push(body.StateDistribution2  ? body.StateDistribution2 : 0);
    _sqlparams.push(body.LocalDistribution1  ? body.LocalDistribution1 : 0);
    _sqlparams.push(body.LocalDistribution2  ? body.LocalDistribution2 : 0);
    _sqlparams.push(body.FormName ? body.FormName : "");
     

    return _sqlparams;
  }

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

