'use strict';

var mysql = require('mysql');
var formFunctions = require('./formsFunctions.js');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_form_w2g';

  server.get('/w2g/has/:userId/:Year', (req, res, next) => {

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

  server.get('/w2g/has/:userId', (req, res, next) => {

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

  server.post('/w2g/:userId', (req, res, next) => {
    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body.hasOwnProperty('Ts') && req.body.Ts  != "" && 
          req.body.hasOwnProperty('FormName') && req.body.FormName  != "" &&
          req.body.hasOwnProperty('Ein') && req.body.Ein  != "" &&
          req.body.hasOwnProperty('Name') && req.body.Name  != "" && 
          req.body.hasOwnProperty('NameCont') && req.body.NameCont  != "" && 
          req.body.hasOwnProperty('Street') && req.body.Street  != "" &&
          req.body.hasOwnProperty('City') && req.body.City  != "" && 
          req.body.hasOwnProperty('State') && req.body.State  != "" &&
          req.body.hasOwnProperty('Zip') && req.body.Zip  != "" &&
          req.body.hasOwnProperty('PhoneNumber') && req.body.PhoneNumber  != "" &&
          req.body.hasOwnProperty('FirstNameW') && req.body.FirstNameW  != "" && 
          req.body.hasOwnProperty('LastNameW') && req.body.LastNameW  != "" && 
          req.body.hasOwnProperty('StreetW') && req.body.StreetW  != "" &&
          req.body.hasOwnProperty('CityW') && req.body.CityW  != "" && 
          req.body.hasOwnProperty('StateW') && req.body.StateW  != "" &&
          req.body.hasOwnProperty('ZipW') && req.body.ZipW  != "")
      {

          var _sqlparams = [];

          _sqlparams.push(req.body.Ts);
          _sqlparams.push(req.body.FormName);
          _sqlparams.push(req.body.Ein);
          _sqlparams.push(req.body.Name);
          _sqlparams.push(req.body.NameCont);
          _sqlparams.push(req.body.Street);
          _sqlparams.push(req.body.City);
          _sqlparams.push(req.body.State);
          _sqlparams.push(req.body.Zip);
          _sqlparams.push(req.body.PhoneNumber);
          _sqlparams.push(req.body.FirstNameW);
          _sqlparams.push(req.body.LastNameW);
          _sqlparams.push(req.body.StreetW);
          _sqlparams.push(req.body.CityW);
          _sqlparams.push(req.body.StateW);
          _sqlparams.push(req.body.ZipW);
          _sqlparams.push(req.body.AlteredW2 ? 1 : 0);
          _sqlparams.push(req.body.CorrectedW2 ? 1 : 0);
          _sqlparams.push(req.body.LotteryW ? 1 : 0);
          _sqlparams.push(req.body.ElectronicW ? 1 : 0);
          _sqlparams.push(req.body.CostTicket ? req.body.CostTicket : 0);
          _sqlparams.push(req.body.GrossWin ? req.body.GrossWin : 0);
          _sqlparams.push(req.body.DateWon);
          _sqlparams.push(req.body.TypeWager);
          _sqlparams.push(req.body.FedTax);
          _sqlparams.push(req.body.TransactionW);
          _sqlparams.push(req.body.Race);
          _sqlparams.push(req.body.WinningsI);
          _sqlparams.push(req.body.Cashier);
          _sqlparams.push(req.body.Window);
          _sqlparams.push(req.body.FirstID);
          _sqlparams.push(req.body.SecondID);
          _sqlparams.push(req.body.ST);
          _sqlparams.push(req.body.PayerStateId);
          _sqlparams.push(req.body.StateWinnings);
          _sqlparams.push(req.body.StateTax);
          _sqlparams.push(req.body.LocalWin);
          _sqlparams.push(req.body.LocalWH);
          _sqlparams.push(req.body.LocalityName);
          _sqlparams.push(req.body.winnerTaxIdentification);
          

          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.params.userId);
          _sqlparams.push(req.body.Year);
          
          //if record doesn't exist we create it
          //inserting new rpersonal profile
          var queryInsert = "INSERT INTO " + table + " (`Ts`, `FormName`, `Ein`, `Name`, `NameCont`, `Street`, `City`, `State`, `Zip`, `PhoneNumber`, `FirstNameW`, `LastNameW`, `StreetW`, `CityW`, `StateW`, `ZipW`, `AlteredW2`, `CorrectedW2`, `LotteryW`, `ElectronicW`, `CostTicket`, `GrossWin`, `DateWon`, `TypeWager`, `FedTax`, `TransactionW`, `Race`, `WinningsI`, `Cashier`, `Window`, `FirstID`, `SecondID`, `ST`, `PayerStateId`, `StateWinnings`, `StateTax`, `LocalWin`, `LocalWH`, `LocalityName`, `winnerTaxIdentification`, `FormInfoId`, `UserID`,`Year`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

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
  
  server.put('/w2g/:w2gId', (req, res, next) => {
    if(req.params.w2gId && isInteger(req.params.w2gId) ){

      var _sqlparams = [];

      _sqlparams.push(req.body.Ts);
          _sqlparams.push(req.body.FormName);
          _sqlparams.push(req.body.Ein);
          _sqlparams.push(req.body.Name);
          _sqlparams.push(req.body.NameCont);
          _sqlparams.push(req.body.Street);
          _sqlparams.push(req.body.City);
          _sqlparams.push(req.body.State);
          _sqlparams.push(req.body.Zip);
          _sqlparams.push(req.body.PhoneNumber);
          _sqlparams.push(req.body.FirstNameW);
          _sqlparams.push(req.body.LastNameW);
          _sqlparams.push(req.body.StreetW);
          _sqlparams.push(req.body.CityW);
          _sqlparams.push(req.body.StateW);
          _sqlparams.push(req.body.ZipW);
          _sqlparams.push(req.body.AlteredW2 ? 1 : 0);
          _sqlparams.push(req.body.CorrectedW2 ? 1 : 0);
          _sqlparams.push(req.body.LotteryW ? 1 : 0);
          _sqlparams.push(req.body.ElectronicW ? 1 : 0);
          _sqlparams.push(req.body.CostTicket ? req.body.CostTicket : 0);
          _sqlparams.push(req.body.GrossWin ? req.body.GrossWin : 0);
          _sqlparams.push(req.body.DateWon);
          _sqlparams.push(req.body.TypeWager);
          _sqlparams.push(req.body.FedTax);
          _sqlparams.push(req.body.TransactionW);
          _sqlparams.push(req.body.Race);
          _sqlparams.push(req.body.WinningsI);
          _sqlparams.push(req.body.Cashier);
          _sqlparams.push(req.body.Window);
          _sqlparams.push(req.body.FirstID);
          _sqlparams.push(req.body.SecondID);
          _sqlparams.push(req.body.ST);
          _sqlparams.push(req.body.PayerStateId);
          _sqlparams.push(req.body.StateWinnings);
          _sqlparams.push(req.body.StateTax);
          _sqlparams.push(req.body.LocalWin);
          _sqlparams.push(req.body.LocalWH);
          _sqlparams.push(req.body.LocalityName);
          _sqlparams.push(req.body.winnerTaxIdentification);
          _sqlparams.push(req.params.w2gId);
   
      var queryInsert = "UPDATE " + table + " SET `Ts` = ?,`FormName` = ?,`Ein` = ?,`Name` = ?,`NameCont` = ?,`Street` = ?,`City` = ?,`State` = ?,`Zip` = ?, `PhoneNumber` = ?,`FirstNameW` = ?,`LastNameW` = ?,`StreetW` = ?,`CityW` = ?,`StateW` = ?,`ZipW` = ?,`AlteredW2` = ?,`CorrectedW2` = ?,`LotteryW` = ?,`ElectronicW` = ?,`CostTicket` = ?,`GrossWin` = ?,`DateWon` = ?,`TypeWager` = ?,`FedTax` = ?,`TransactionW` = ?,`Race` = ?,`WinningsI` = ?,`Cashier` = ?,`Window` = ?,`FirstID` = ?,`SecondID` = ?,`ST` = ?,`PayerStateId` = ?,`StateWinnings` = ?,`StateTax` = ?,`LocalWin` = ?,`LocalWH` = ?,`LocalityName` = ?, `winnerTaxIdentification` = ? WHERE `Id` = ?;";

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
      res.send(200, {success: false, message: "The w2gId id is required"});
      return next(false);  
    }
    return next();
  });

  server.del('/w2g/:formId/:userId', (req, res, next) => {
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

