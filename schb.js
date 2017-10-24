'use strict';

var mysql = require('mysql');
var formFunctions = require('./formsFunctions.js');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_form_schb';

  server.get('/schb/has/:userId/:Year', (req, res, next) => {
    conectionDB();
    return formFunctions.getByUserNYear(req, res, next, table, connection);
    
  });

  server.get('/schb/has/:userId', (req, res, next) => {
    conectionDB();
    return formFunctions.getByUser(req, res, next, table, connection);
    
  });

  server.post('/schb/:userId', (req, res, next) => {

    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body != undefined &&
          req.body.hasOwnProperty('tsj') && req.body.tsj != "" &&  
          req.body.hasOwnProperty('Seller') && req.body.Seller != "" && 
          req.body.hasOwnProperty('TaxIdNumber') && req.body.TaxIdNumber != "" && 
          req.body.hasOwnProperty('ssn') && req.body.ssn != "" &&
          req.body.hasOwnProperty('Name') && req.body.Name != "" &&
          req.body.hasOwnProperty('Street') && req.body.Street != "" &&
          req.body.hasOwnProperty('City') && req.body.City != "" &&
          req.body.hasOwnProperty('ZipCode') && req.body.ZipCode != "" && 
          req.body.hasOwnProperty('AccountNumber') && req.body.AccountNumber != "")
      {

        
          var _sqlparams = loadData(req.body);

          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.params.userId);
          _sqlparams.push(req.body.Year);

            //if record doesn't exist we create it
            //inserting new rpersonal profile
            var queryInsert = "INSERT INTO " + table + " (`tsj`, `Seller`, `TaxIdNumber`, `ssn`, `Name`, `Street`, `City`, `State`, `ZipCode`, `AccountNumber`, `Interest`, `EarlyDraw`, `UsInterest`, `FederalTaxW`, `Investment`, `ForeignTax`, `ForeignCountry`, `TaxExemp`, `PrivateActivity`, `MarketDiscount`, `BondPremiun`, `BondPremiunE`, `TaxExempCreditNumber`, `ST1`, `StateId1`, `StateTaxWH1`, `ST2`, `StateId2`, `StateTaxWH2`, `FormInfoId`,`UserId`,`Year`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

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
          //req.body.hasOwnProperty('tsj') && req.body.tsj != "" &&  
          //req.body.hasOwnProperty('Seller') && req.body.Seller != "" && 
          
        if(req.body == undefined){
          fields += "tsj, Seller, TaxIdNumber, ssn, Name, Street, City, ZipCode, AccountNumber";
         
        }else{
          if(!(req.body.hasOwnProperty('tsj') && req.body.tsj != ""))
            fields += "bbt";
          
          if(!(req.body.hasOwnProperty('Seller') && req.body.Seller != "")){
            if(fields != "")
              fields += ", "
            fields += "Seller";
          }

          if(!(req.body.hasOwnProperty('TaxIdNumber') && req.body.TaxIdNumber != "" )){
            if(fields != "")
              fields += ", "
            fields += "TaxIdNumber";
          }

          if(!(req.body.hasOwnProperty('ssn') && req.body.ssn != "")){
            if(fields != "")
              fields += ", "
            fields += "ssn";
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

          if(!(req.body.hasOwnProperty('AccountNumber') && req.body.AccountNumber != "")){
            if(fields != "")
              fields += ", "
            fields += "AccountNumber";
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
  
  server.put('/schb/:SchbID', (req, res, next) => {
    if(req.params.SchbID && isInteger(req.params.SchbID) ){

      var _sqlparams = loadData(req.body);
         
      _sqlparams.push(req.params.SchbID);
   
      var queryUpdate = "UPDATE " + table + " SET `tsj` = ?, `Seller` = ?, `TaxIdNumber` = ?, `ssn` = ?, `Name` = ?, `Street` = ?, `City` = ?, `State` = ?, `ZipCode` = ?, `AccountNumber` = ?, `Interest` = ?, `EarlyDraw` = ?, `UsInterest` = ?, `FederalTaxW` = ?, `Investment` = ?, `ForeignTax` = ?, `ForeignCountry` = ?, `TaxExemp` = ?, `PrivateActivity` = ?, `MarketDiscount` = ?, `BondPremiun` = ?, `BondPremiunE` = ?, `TaxExempCreditNumber` = ?, `ST1` = ?, `StateId1` = ?, `StateTaxWH1` = ?, `ST2` = ?, `StateId2` = ?, `StateTaxWH2` = ?, WHERE `Id` = ?;";

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
      res.send(200, {success: false, message: "The Schb  id is required"});
      return next(false);  
    }
    return next();
  });

  server.del('/schb/:formId/:userId', (req, res, next) => {
    conectionDB();
    return formFunctions.delRecord(req, res, next, table, connection);  
  });

  function loadData(body){

    var _sqlparams = [];
    
    _sqlparams.push(body.tsj ? body.tsj : "");
    _sqlparams.push(body.Seller ? 1 : 0);
    _sqlparams.push(body.TaxIdNumber ? body.TaxIdNumber : "");
    _sqlparams.push(body.ssn ? 1 : 0);
    _sqlparams.push(body.Name ? body.Name : "");
    _sqlparams.push(body.Street ? body.Street : "");
    _sqlparams.push(body.City ? body.City : "");
    _sqlparams.push(body.State ? body.State : "");
    _sqlparams.push(body.ZipCode ? body.ZipCode : "");
    _sqlparams.push(body.AccountNumber ? body.AccountNumber : "");

    _sqlparams.push(body.Interest ? body.Interest : 0);
    _sqlparams.push(body.EarlyDraw ? body.EarlyDraw : 0);
    _sqlparams.push(body.UsInterest ? body.UsInterest : 0);
    _sqlparams.push(body.FederalTaxW ? body.FederalTaxW : 0);
    _sqlparams.push(body.Investment ? body.Investment : 0);
    _sqlparams.push(body.ForeignTax ? body.ForeignTax : 0);
    _sqlparams.push(body.ForeignCountry ? body.ForeignCountry : "");
    _sqlparams.push(body.TaxExemp ? body.TaxExemp : 0);
    _sqlparams.push(body.PrivateActivity ? body.PrivateActivity : 0);
    _sqlparams.push(body.MarketDiscount ? body.MarketDiscount : 0);
    _sqlparams.push(body.BondPremiun ? body.BondPremiun : 0);
    _sqlparams.push(body.BondPremiunE ? body.BondPremiunE : 0);
    _sqlparams.push(body.TaxExempCreditNumber ? body.TaxExempCreditNumber : "");
    _sqlparams.push(body.ST1 ? body.ST1 : "");
    _sqlparams.push(body.StateId1 ? body.StateId1 : "");
    _sqlparams.push(body.StateTaxWH1 ? body.StateTaxWH1 : 0);
    _sqlparams.push(body.ST2 ? body.ST2 : "");
    _sqlparams.push(body.StateId2 ? body.StateId2 : "");
    _sqlparams.push(body.StateTaxWH2 ?body.StateTaxWH2 : 0);
     

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

