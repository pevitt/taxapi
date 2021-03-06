'use strict';

var mysql = require('mysql');
var formFunctions = require('./formsFunctions.js');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_form_8863';

  server.get('/form8863/has/:userId/:Year', (req, res, next) => {

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

  server.get('/form8863/has/:userId', (req, res, next) => {

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

  server.post('/form8863/:userId', (req, res, next) => {
    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body.hasOwnProperty('Ts') && req.body.Ts  != "" && 
          req.body.hasOwnProperty('FormName') && req.body.FormName  != "" &&
          req.body.hasOwnProperty('Ssn') && req.body.Ssn  != "" &&
          req.body.hasOwnProperty('FirstName') && req.body.FirstName  != "" && 
          req.body.hasOwnProperty('Lastname') && req.body.Lastname  != "")
      {

          var _sqlparams = [];

          _sqlparams.push(req.body.Ts);
          _sqlparams.push(req.body.FormName);
          _sqlparams.push(req.body.Ssn);
          _sqlparams.push(req.body.FirstName);
          _sqlparams.push(req.body.Lastname);
          _sqlparams.push(req.body.Degree ? 1 : 0);
          _sqlparams.push(req.body.Enrollment ? 1 : 0);
          _sqlparams.push(req.body.ManyYears);
          _sqlparams.push(req.body.Pursuing);
          _sqlparams.push(req.body.TotalQ ? req.body.TotalQ : 0);
          _sqlparams.push(req.body.AdditionalE ? req.body.AdditionalE : 0);
          _sqlparams.push(req.body.CollageName);
          _sqlparams.push(req.body.GetForm ? 1 : 0);
          _sqlparams.push(req.body.Eins);
          _sqlparams.push(req.body.NameS);
          _sqlparams.push(req.body.StreetS);
          _sqlparams.push(req.body.CityS);
          _sqlparams.push(req.body.StateS);
          _sqlparams.push(req.body.ZipS);
          _sqlparams.push(req.body.PaymentR ? req.body.PaymentR : 0);
          _sqlparams.push(req.body.AmountB ? req.body.AmountB : 0);
          _sqlparams.push(req.body.ChangedMethod ? 1 : 0);
          _sqlparams.push(req.body.AdjusmentM ? req.body.AdjusmentM : 0);
          _sqlparams.push(req.body.SGrants ? req.body.SGrants : 0);
          _sqlparams.push(req.body.AdjusmentS ? req.body.AdjusmentS : 0);
          _sqlparams.push(req.body.Box7 ? 1 : 0);
          _sqlparams.push(req.body.Box8 ? 1 : 0);
          _sqlparams.push(req.body.Box9 ? 1 : 0);
          _sqlparams.push(req.body.InsuranceC ? req.body.InsuranceC : 0);
          _sqlparams.push(req.body.GetFormBefore ? 1 : 0);
          _sqlparams.push(req.params.userId);
          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.body.Year);
          
          
          //if record doesn't exist we create it
          //inserting new rpersonal profile
          var queryInsert = "INSERT INTO " + table + " (`Ts`, `FormName`, `Ssn`, `FirstName`, `Lastname`, `Degree`, `Enrollment`, `ManyYears`, `Pursuing`, `TotalQ`, `AdditionalE`, `CollageName`, `GetForm`, `Eins`, `NameS`, `StreetS`, `CityS`, `StateS`, `ZipS`, `PaymentR`, `AmountB`, `ChangedMethod`, `AdjusmentM`, `SGrants`, `AdjusmentS`, `Box7`, `Box8`, `Box9`, `InsuranceC`, `GetFormBefore`, `UserID`, `FormInfoId`, `Year`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

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
        res.send(200, {success: false, message: "One of this fields has no value: "});
        return next(false);
     }

    }else{
      res.send(200, {success: false, message: "User id is required"});
      return next(false);  
    }
    return next();
  });
  
  server.put('/form8863/:formId', (req, res, next) => {
    if(req.params.formId && isInteger(req.params.formId) ){

      var _sqlparams = [];

      
          _sqlparams.push(req.body.Ts);
          _sqlparams.push(req.body.FormName);
          _sqlparams.push(req.body.Ssn);
          _sqlparams.push(req.body.FirstName);
          _sqlparams.push(req.body.Lastname);
          _sqlparams.push(req.body.Degree ? 1 : 0);
          _sqlparams.push(req.body.Enrollment ? 1 : 0);
          _sqlparams.push(req.body.ManyYears);
          _sqlparams.push(req.body.Pursuing);
          _sqlparams.push(req.body.TotalQ ? req.body.TotalQ : 0);
          _sqlparams.push(req.body.AdditionalE ? req.body.AdditionalE : 0);
          _sqlparams.push(req.body.CollageName);
          
          _sqlparams.push(req.body.GetForm ? 1 : 0);
          _sqlparams.push(req.body.Eins);
          _sqlparams.push(req.body.NameS);
          _sqlparams.push(req.body.StreetS);
          _sqlparams.push(req.body.CityS);
          _sqlparams.push(req.body.StateS);
          _sqlparams.push(req.body.ZipS);
           _sqlparams.push(req.body.PaymentR ? req.body.PaymentR : 0);
          _sqlparams.push(req.body.AmountB ? req.body.AmountB : 0);
          _sqlparams.push(req.body.ChangedMethod ? 1 : 0);
          _sqlparams.push(req.body.AdjusmentM ? req.body.AdjusmentM : 0);
          _sqlparams.push(req.body.SGrants ? req.body.SGrants : 0);
          _sqlparams.push(req.body.AdjusmentS ? req.body.AdjusmentS : 0);
          _sqlparams.push(req.body.Box7 ? 1 : 0);
          _sqlparams.push(req.body.Box8 ? 1 : 0);
          _sqlparams.push(req.body.Box9 ? 1 : 0);
          _sqlparams.push(req.body.InsuranceC ? req.body.InsuranceC : 0);
          _sqlparams.push(req.body.GetFormBefore ? 1 : 0);
          _sqlparams.push(req.params.formId);
   
      var queryInsert = "UPDATE " + table + " SET `Ts`=?,`FormName`=?,`Ssn`=?,`FirstName`=?,`Lastname`=?,`Degree`=?,`Enrollment`=?,`ManyYears`=?,`Pursuing`=?,`TotalQ`=?,`AdditionalE`=?,`CollageName`=?,`GetForm`=?,`Eins`=?,`NameS`=?,`StreetS`=?,`CityS`=?,`StateS`=?,`ZipS`=?,`PaymentR`=?,`AmountB`=?,`ChangedMethod`=?,`AdjusmentM`=?,`SGrants`=?,`AdjusmentS`=?,`Box7`=?,`Box8`=?,`Box9`=?,`InsuranceC`=?,`GetFormBefore`=? WHERE `Id` = ?;";

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
      res.send(200, {success: false, message: "The FormId  is required"});
      return next(false);  
    }
    return next();
  });

  server.del('/form8863/:formId/:userId', (req, res, next) => {
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

