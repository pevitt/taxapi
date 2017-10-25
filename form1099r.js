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
            var queryInsert = "INSERT INTO " + table + " ( `ts`, `f`, `fort`, `MultiForm`, `ein`, `Name`, `NameContinued`, `Street`, `City`, `State`, `ZipCode`, `FirstName1`, `LastName1`, `Street1`, `City1`, `State1`, `ZipCode1`, `Rents`, `OtherIncome`, `Description`, `Report8615`, `FederalTax`, `FishingBoat`, `MedicalHealt`, `NoEmployComp`, `SubstitutePay`, `PayerMade`, `CropInsurance`, `ForeignTax`, `ForeignCountry`, `ExcessGolden`, `GrossAttomey`, `TaxablePro`, `Section409ad`, `Section409ai`, `StateTaxW1`, `ST1`, `StateTaxW11`, `StateIncome1`, `LocalIncome1`, `LocalTax1`, `Locality1`, `StateTaxW2`, `ST2`, `StateTaxW22`, `StateIncome2`, `LocalIncome2`, `LocalTax2`, `Locality2`, `foreingState`, `foreingZipCode`, `foreingPostalCode`, `FormInfoId`,`UserId`,`Year`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

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

      var queryUpdate = "UPDATE " + table + " SET `ts` = ?, `f` = ?, `fort` = ?, `MultiForm` = ?, `ein` = ?, `Name` = ?, `NameContinued` = ?, `Street` = ?, `City` = ?, `State` = ?, `ZipCode` = ?, `FirstName1` = ?, `LastName1` = ?, `Street1` = ?, `City1` = ?, `State1` = ?, `ZipCode1` = ?, `Rents` = ?, `OtherIncome` = ?, `Description` = ?, `Report8615` = ?, `FederalTax` = ?, `FishingBoat` = ?, `MedicalHealt` = ?, `NoEmployComp` = ?, `SubstitutePay` = ?, `PayerMade` = ?, `CropInsurance` = ?, `ForeignTax` = ?, `ForeignCountry` = ?, `ExcessGolden` = ?, `GrossAttomey` = ?, `TaxablePro` = ?, `Section409ad` = ?, `Section409ai` = ?, `StateTaxW1` = ?, `ST1` = ?, `StateTaxW11` = ?, `StateIncome1` = ?, `LocalIncome1` = ?, `LocalTax1` = ?, `Locality1` = ?, `StateTaxW2` = ?, `ST2` = ?, `StateTaxW22` = ?, `StateIncome2` = ?, `LocalIncome2` = ?, `LocalTax2` = ?, `Locality2` = ?, `foreingState` = ?, `foreingZipCode` = ?, `foreingPostalCode` = ? WHERE `Id` = ?;";

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

