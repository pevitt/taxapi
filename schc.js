'use strict';

var mysql = require('mysql');
var formFunctions = require('./formsFunctions.js');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_form_schc';

  server.get('/schc/has/:userId/:Year', (req, res, next) => {

    return formFunctions.getByUserNYear(req, res, next, table);
    
  });

  server.get('/schc/has/:userId', (req, res, next) => {

    return formFunctions.getByUser(req, res, next, table);

    
  });

  server.post('/schc/:userId', (req, res, next) => {
    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body.hasOwnProperty('bbt') && req.body.bbt != "" &&  
          req.body.hasOwnProperty('bpps') && req.body.bpps != "" && 
          req.body.hasOwnProperty('EmployeerId') && req.body.EmployeerId != "" && 
          req.body.hasOwnProperty('BusinessName') && req.body.BusinessName != "" &&
          req.body.hasOwnProperty('Street') && req.body.Street != "" &&
          req.body.hasOwnProperty('City') && req.body.City != "" &&
          req.body.hasOwnProperty('State') && req.body.State != "" &&
          req.body.hasOwnProperty('ZipCode') && req.body.ZipCode != "" &&)
      {

        
          _sqlparams = loadData(req.body);

          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.params.userId);
          _sqlparams.push(req.body.Year);

            //if record doesn't exist we create it
            //inserting new rpersonal profile
            var queryInsert = "INSERT INTO " + table + " (`bbt`,`bpps`,`EmployeerId`,`BusinessName`,`Street`,`City`,`State`,`ZipCode`,`CashIncome`,`ChecksCredits`,`TotalGross`,`Advertising`,`CarTruck`,`Commissions`,`ContractLabor`,`DepreciationVehicule`,`DepreciationReal`,`DepreciationAdj`,`EmployeeBen`,`Insurance`,`Montgage`,`Other`,`OfficeExpense`,`RentVehicle`,`RentOffice`,`Repair`,`Supplies`,`Taxes`,`Travel`,`Meals`,`Utilities`,`Wages`,`Other2`,`HomeOffice`,`LegalServices`,`TotalExpenses`,`TotalAmount`,`FormInfoId`,`UserId`,`Year`)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

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

        if(!(req.body.hasOwnProperty('bbt') && req.body.bbt != ""))
          fields += "bbt";
        
        if(!(req.body.hasOwnProperty('bpps') && req.body.bpps != ""))
          fields += "bpps";
        
        if(!(req.body.hasOwnProperty('EmployeerId') && req.body.EmployeerId != ""))
          fields += "EmployeerId";
        
        if(!(req.body.hasOwnProperty('BusinessName') && req.body.BusinessName != ""))
          fields += "BusinessName";
        
        if(!(req.body.hasOwnProperty('Street') && req.body.Street != ""))
          fields += "Street";
        
        if(!(req.body.hasOwnProperty('City') && req.body.City != ""))
          fields += "City";
        
        if(!(req.body.hasOwnProperty('State') && req.body.State != ""))
          fields += "State";
        
        if(!(req.body.hasOwnProperty('ZipCode') && req.body.ZipCode != ""))
          fields += "ZipCode";

        

        res.send(200, {success: false, message: "One of this fields has no value: " + fields});
        return next(false);
     }

    }else{
      res.send(200, {success: false, message: "User Id is required"});
      return next(false);  
    }
    return next();
  });
  
  server.put('/schc/:SchCID', (req, res, next) => {
    if(req.params.ChildCareID && isInteger(req.params.ChildCareID) ){

      _sqlparams = loadData(req.body);
         
      _sqlparams.push(req.params.SchCID);

   
      var queryUpdate = "UPDATE " + table + " SET `bbt` = ?, `bpps` = ?, `EmployeerId` = ?, `BusinessName` = ?, `Street` = ?, `City` = ?, `State` = ?, `ZipCode` = ?, `CashIncome` = ?, `ChecksCredits` = ?, `TotalGross` = ?, `Advertising` = ?, `CarTruck` = ?, `Commissions` = ?, `ContractLabor` = ?, `DepreciationVehicule` = ?, `DepreciationReal` = ?, `DepreciationAdj` = ?, `EmployeeBen` = ?, `Insurance` = ?, `Montgage` = ?, `Other` = ?, `OfficeExpense` = ?, `RentVehicle` = ?, `RentOffice` = ?, `Repair` = ?, `Supplies` = ?, `Taxes` = ?, `Travel` = ?, `Meals` = ?, `Utilities` = ?, `Wages` = ?, `Other2` = ?, `HomeOffice` = ?, `LegalServices` = ?, `TotalExpenses` = ?, `TotalAmount` = ?> WHERE  `Id` = ?;";

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
      res.send(200, {success: false, message: "The SchC  id is required"});
      return next(false);  
    }
    return next();
  });

  function loadData(body){

    var _sqlparams = [];
    _sqlparams.push(body.bbt);
    _sqlparams.push(body.bpps);
    _sqlparams.push(body.EmployeerId);
    _sqlparams.push(body.BusinessName);
    _sqlparams.push(body.Street);
    _sqlparams.push(body.City);
    _sqlparams.push(body.State);
    _sqlparams.push(body.ZipCode);

     _sqlparams.push(body.CashIncome ? body.CashIncome : 0 ); 
     _sqlparams.push(body.ChecksCredits ? body.ChecksCredits : 0 ); 
     _sqlparams.push(body.TotalGross ? body.TotalGross : 0 ); 
     _sqlparams.push(body.Advertising ? body.Advertising : 0 ); 
     _sqlparams.push(body.CarTruck ? body.CarTruck : 0 ); 
     _sqlparams.push(body.Commissions ? body.Commissions : 0 ); 
     _sqlparams.push(body.ContractLabor ? body.ContractLabor : 0 ); 
     _sqlparams.push(body.DepreciationVehicule ? body.DepreciationVehicule : 0 ); 
     _sqlparams.push(body.DepreciationReal ? body.DepreciationReal : 0 ); 
     _sqlparams.push(body.DepreciationAdj ? body.DepreciationAdj : 0 ); 
     _sqlparams.push(body.EmployeeBen ? body.EmployeeBen : 0 ); 
     _sqlparams.push(body.Insurance ? body.Insurance : 0 ); 
     _sqlparams.push(body.Montgage ? body.Montgage : 0 ); 
     _sqlparams.push(body.Other ? body.Other : 0 ); 
     _sqlparams.push(body.OfficeExpense ? body.OfficeExpense : 0 ); 
     _sqlparams.push(body.RentVehicle ? body.RentVehicle : 0 ); 
     _sqlparams.push(body.RentOffice ? body.RentOffice : 0 ); 
     _sqlparams.push(body.Repair ? body.Repair : 0 ); 
     _sqlparams.push(body.Supplies ? body.Supplies : 0 ); 
     _sqlparams.push(body.Taxes ? body.Taxes : 0 ); 
     _sqlparams.push(body.Travel ? body.Travel : 0 ); 
     _sqlparams.push(body.Meals ? body.Meals : 0 ); 
     _sqlparams.push(body.Utilities ? body.Utilities : 0 ); 
     _sqlparams.push(body.Wages ? body.Wages : 0 ); 
     _sqlparams.push(body.Other2 ? body.Other2 : 0 ); 
     _sqlparams.push(body.HomeOffice ? body.HomeOffice : 0 ); 
     _sqlparams.push(body.LegalServices ? body.LegalServices : 0 ); 
     _sqlparams.push(body.TotalExpenses ? body.TotalExpenses : 0 ); 
     _sqlparams.push(body.TotalAmount ? body.TotalAmount : 0 );

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

