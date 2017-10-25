'use strict';

var mysql = require('mysql');
var formFunctions = require('./formsFunctions.js');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_form_1099m';

  server.get('/form_1099m/has/:userId/:Year', (req, res, next) => {
    conectionDB();
    return formFunctions.getByUserNYear(req, res, next, table, connection);
    
  });

  server.get('/form_1099m/has/:userId', (req, res, next) => {
    conectionDB();
    return formFunctions.getByUser(req, res, next, table, connection);
    
  });

  server.post('/form_1099m/:userId', (req, res, next) => {

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
          _sqlparams.push(req.body.FormName);
          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.params.userId);
          _sqlparams.push(req.body.Year);
            //if record doesn't exist we create it
            //inserting new rpersonal profile
            var queryInsert = "INSERT INTO " + table + " ( `ts`, `f`, `fort`, `MultiForm`, `ein`, `Name`, `NameContinued`, `Street`, `City`, `State`, `ZipCode`, `FirstName1`, `LastName1`, `Street1`, `City1`, `State1`, `ZipCode1`, `Rents`, `OtherIncome`, `Description`, `Report8615`, `FederalTax`, `FishingBoat`, `MedicalHealt`, `NoEmployComp`, `SubstitutePay`, `PayerMade`, `CropInsurance`, `ForeignTax`, `ForeignCountry`, `ExcessGolden`, `GrossAttomey`, `TaxablePro`, `Section409ad`, `Section409ai`, `StateTaxW1`, `ST1`, `StateTaxW11`, `StateIncome1`, `LocalIncome1`, `LocalTax1`, `Locality1`, `StateTaxW2`, `ST2`, `StateTaxW22`, `StateIncome2`, `LocalIncome2`, `LocalTax2`, `Locality2`, `foreingState`, `foreingZipCode`, `foreingPostalCode`, `FormName`, `FormInfoId`,`UserId`,`Year`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

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
  
  server.put('/form_1099m/:form1099mID', (req, res, next) => {
    if(req.params.form1099mID && isInteger(req.params.form1099mID) ){

      var _sqlparams = loadData(req.body);
      _sqlparams.push(req.body.FormName);
      _sqlparams.push(req.params.form1099mID);

      var queryUpdate = "UPDATE " + table + " SET `ts` = ?, `f` = ?, `fort` = ?, `MultiForm` = ?, `ein` = ?, `Name` = ?, `NameContinued` = ?, `Street` = ?, `City` = ?, `State` = ?, `ZipCode` = ?, `FirstName1` = ?, `LastName1` = ?, `Street1` = ?, `City1` = ?, `State1` = ?, `ZipCode1` = ?, `Rents` = ?, `OtherIncome` = ?, `Description` = ?, `Report8615` = ?, `FederalTax` = ?, `FishingBoat` = ?, `MedicalHealt` = ?, `NoEmployComp` = ?, `SubstitutePay` = ?, `PayerMade` = ?, `CropInsurance` = ?, `ForeignTax` = ?, `ForeignCountry` = ?, `ExcessGolden` = ?, `GrossAttomey` = ?, `TaxablePro` = ?, `Section409ad` = ?, `Section409ai` = ?, `StateTaxW1` = ?, `ST1` = ?, `StateTaxW11` = ?, `StateIncome1` = ?, `LocalIncome1` = ?, `LocalTax1` = ?, `Locality1` = ?, `StateTaxW2` = ?, `ST2` = ?, `StateTaxW22` = ?, `StateIncome2` = ?, `LocalIncome2` = ?, `LocalTax2` = ?, `Locality2` = ?, `foreingState` = ?, `foreingZipCode` = ?, `foreingPostalCode` = ?, `FormName` = ? WHERE `Id` = ?;";

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
      res.send(200, {success: false, message: "The form1099m  id is required"});
      return next(false);  
    }
    return next();
  });

  server.del('/form_1099m/:formId/:userId', (req, res, next) => {
    conectionDB();
    return formFunctions.delRecord(req, res, next, table, connection);  
  });

  function loadData(body){

    var _sqlparams = [];  

     _sqlparams.push(body.ts ? body.ts : "");
     _sqlparams.push(body.f ? body.f : "");
     _sqlparams.push(body.fort ? body.fort : "");
     _sqlparams.push(body.MultiForm ? body.MultiForm : "");
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
     _sqlparams.push(body.Rents ? body.Rents : 0);
     _sqlparams.push(body.OtherIncome ? body.OtherIncome : 0);
     _sqlparams.push(body.Description ? body.Description : "");
     _sqlparams.push(body.Report8615 ? 1 : 0 );
     _sqlparams.push(body.FederalTax ? body.FederalTax : 0);
     _sqlparams.push(body.FishingBoat ? body.FishingBoat : 0);
     _sqlparams.push(body.MedicalHealt ? body.MedicalHealt : 0);
     _sqlparams.push(body.NoEmployComp ? body.NoEmployComp : 0);
     _sqlparams.push(body.SubstitutePay ? body.SubstitutePay : 0);
     _sqlparams.push(body.PayerMade ? 1 : 0 );
     _sqlparams.push(body.CropInsurance ? body.CropInsurance : 0);
     _sqlparams.push(body.ForeignTax ? body.ForeignTax : 0);
     _sqlparams.push(body.ForeignCountry ? body.ForeignCountry : 0);
     _sqlparams.push(body.ExcessGolden ? body.ExcessGolden : 0);
     _sqlparams.push(body.GrossAttomey ? body.GrossAttomey : 0);
     _sqlparams.push(body.TaxablePro ? body.TaxablePro : 0);
     _sqlparams.push(body.Section409ad ? body.Section409ad : 0);
     _sqlparams.push(body.Section409ai ? body.Section409ai : 0);
     _sqlparams.push(body.StateTaxW1 ? body.StateTaxW1 : 0);
     _sqlparams.push(body.ST1 ? body.ST1 : "");
     _sqlparams.push(body.StateTaxW11 ? body.StateTaxW11 : 0);
     _sqlparams.push(body.StateIncome1 ? body.StateIncome1 : 0);
     _sqlparams.push(body.LocalIncome1 ? body.LocalIncome1 : 0);
     _sqlparams.push(body.LocalTax1 ? body.LocalTax1 : 0);
     _sqlparams.push(body.Locality1 ? body.Locality1 : "");
     _sqlparams.push(body.StateTaxW2 ? body.StateTaxW2 : 0);
     _sqlparams.push(body.ST2 ? body.ST2 : "");
     _sqlparams.push(body.StateTaxW22 ? body.StateTaxW22 : 0);
     _sqlparams.push(body.StateIncome2 ? body.StateIncome2 : 0);
     _sqlparams.push(body.LocalIncome2 ? body.LocalIncome2 : 0);
     _sqlparams.push(body.LocalTax2 ? body.LocalTax2 : 0);
     _sqlparams.push(body.Locality2 ? body.Locality2 : "");
     _sqlparams.push(body.foreingState ? body.foreingState : "");
     _sqlparams.push(body.foreingZipCode ? body.foreingZipCode : "");
     _sqlparams.push(body.foreingPostalCode ? body.foreingPostalCode : "");
     

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

