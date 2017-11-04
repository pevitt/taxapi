'use strict';

var mysql = require('mysql');
var formFunctions = require('./formsFunctions.js');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_form_scha';

  server.get('/form_scha/has/:userId/:Year', (req, res, next) => {

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

  server.get('/form_scha/has/:userId', (req, res, next) => {

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

  server.post('/form_scha/:userId', (req, res, next) => {
    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body.hasOwnProperty('Total') && req.body.Total != "")
      {

        
          var _sqlparams = [];

          _sqlparams.push(req.params.userId);
          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.body.Dc1);
          _sqlparams.push(req.body.Dc2);
          _sqlparams.push(req.body.Dc3);
          _sqlparams.push(req.body.Dc4);
          _sqlparams.push(req.body.Dc5);
          _sqlparams.push(req.body.DcAmount1 ? req.body.DcAmount1 : 0);
          _sqlparams.push(req.body.DcAmount2 ? req.body.DcAmount2 : 0);
          _sqlparams.push(req.body.DcAmount3 ? req.body.DcAmount3 : 0);
          _sqlparams.push(req.body.DcAmount4 ? req.body.DcAmount4 : 0);
          _sqlparams.push(req.body.DcAmount5 ? req.body.DcAmount5 : 0);
          _sqlparams.push(req.body.Gift1);
          _sqlparams.push(req.body.Gift2);
          _sqlparams.push(req.body.GiftAmount1 ? req.body.GiftAmount1 : 0);
          _sqlparams.push(req.body.GiftAmount2 ? req.body.GiftAmount2 : 0);
          _sqlparams.push(req.body.Job1);
          _sqlparams.push(req.body.Job2);
          _sqlparams.push(req.body.Job3);
          _sqlparams.push(req.body.Job4);
          _sqlparams.push(req.body.Job5);
          _sqlparams.push(req.body.JobAmount1 ? req.body.JobAmount1 : 0);
          _sqlparams.push(req.body.JobAmount2 ? req.body.JobAmount2 : 0);
          _sqlparams.push(req.body.JobAmount3 ? req.body.JobAmount3 : 0);
          _sqlparams.push(req.body.JobAmount4 ? req.body.JobAmount4 : 0);
          _sqlparams.push(req.body.JobAmount5 ? req.body.JobAmount5 : 0);
          _sqlparams.push(req.body.Other1);
          _sqlparams.push(req.body.Other2);
          _sqlparams.push(req.body.Other3);
          _sqlparams.push(req.body.OtherAmount1 ? req.body.OtherAmount1 : 0);
          _sqlparams.push(req.body.OtherAmount2 ? req.body.OtherAmount2 : 0);
          _sqlparams.push(req.body.OtherAmount3 ? req.body.OtherAmount3 : 0);
          _sqlparams.push(req.body.Total ? req.body.Total : 0);
           _sqlparams.push(req.body.Year);
           _sqlparams.push(body.MedicalExpenses ? body.MedicalExpenses : '' );
          _sqlparams.push(body.GiftsExpenses ? body.GiftsExpenses : '' );
          _sqlparams.push(body.JobsExpenses ? body.JobsExpenses : '' );
          _sqlparams.push(body.OthersExpenses ? body.OthersExpenses : '' );
          _sqlparams.push(body.medicaltotal ? body.medicaltotal : 0 );
          _sqlparams.push(body.gifttotal ? body.gifttotal : 0 );
          _sqlparams.push(body.jobtotal ? body.jobtotal : 0 );
          _sqlparams.push(body.othertotal ? body.othertotal : 0 );

          console.log("insert child care: ",_sqlparams);

            //if record doesn't exist we create it
            //inserting new rpersonal profile
            var queryInsert = "INSERT INTO " + table + " (`UserId`, `FormInfoId`, `Dc1`, `Dc2`, `Dc3`, `Dc4`, `Dc5`, `DcAmount1`, `DcAmount2`, `DcAmount3`, `DcAmount4`, `DcAmount5`, `Gift1`, `Gift2`, `GiftAmount1`, `GiftAmount2`, `Job1`, `Job2`, `Job3`, `Job4`, `Job5`, `JobAmount1`, `JobAmount2`, `JobAmount3`, `JobAmount4`, `JobAmount5`, `Other1`, `Other2`, `Other3`, `OtherAmount1`, `OtherAmount2`, `OtherAmount3`, `Total`, `Year`, `MedicalExpenses`, `GiftsExpenses`, `JobsExpenses`, `OthersExpenses`, `medicaltotal`, `gifttotal`, `jobtotal`, `othertotal`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

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
          
          console.log("req.body.hasOwnProperty('Total') ",req.body.hasOwnProperty('Total') );
          
          

          console.log(req.body);

        res.send(200, {success: false, message: "One of this fields has no value: Total"});
        return next(false);
     }

    }else{
      res.send(200, {success: false, message: "User Id is required"});
      return next(false);  
    }
    return next();
  });
  
  server.put('/form_scha/:SchaId', (req, res, next) => {
    if(req.params.SchaId && isInteger(req.params.SchaId) ){

      var _sqlparams = [];

          _sqlparams.push(req.body.Dc1);
          _sqlparams.push(req.body.Dc2);
          _sqlparams.push(req.body.Dc3);
          _sqlparams.push(req.body.Dc4);
          _sqlparams.push(req.body.Dc5);
          _sqlparams.push(req.body.DcAmount1 ? req.body.DcAmount1 : 0);
          _sqlparams.push(req.body.DcAmount2 ? req.body.DcAmount2 : 0);
          _sqlparams.push(req.body.DcAmount3 ? req.body.DcAmount3 : 0);
          _sqlparams.push(req.body.DcAmount4 ? req.body.DcAmount4 : 0);
          _sqlparams.push(req.body.DcAmount5 ? req.body.DcAmount5 : 0);
          _sqlparams.push(req.body.Gift1);
          _sqlparams.push(req.body.Gift2);
          _sqlparams.push(req.body.GiftAmount1 ? req.body.GiftAmount1 : 0);
          _sqlparams.push(req.body.GiftAmount2 ? req.body.GiftAmount2 : 0);
          _sqlparams.push(req.body.Job1);
          _sqlparams.push(req.body.Job2);
          _sqlparams.push(req.body.Job3);
          _sqlparams.push(req.body.Job4);
          _sqlparams.push(req.body.Job5);
          _sqlparams.push(req.body.JobAmount1 ? req.body.JobAmount1 : 0);
          _sqlparams.push(req.body.JobAmount2 ? req.body.JobAmount2 : 0);
          _sqlparams.push(req.body.JobAmount3 ? req.body.JobAmount3 : 0);
          _sqlparams.push(req.body.JobAmount4 ? req.body.JobAmount4 : 0);
          _sqlparams.push(req.body.JobAmount5 ? req.body.JobAmount5 : 0);
          _sqlparams.push(req.body.Other1);
          _sqlparams.push(req.body.Other2);
          _sqlparams.push(req.body.Other3);
          _sqlparams.push(req.body.OtherAmount1 ? req.body.OtherAmount1 : 0);
          _sqlparams.push(req.body.OtherAmount2 ? req.body.OtherAmount2 : 0);
          _sqlparams.push(req.body.OtherAmount3 ? req.body.OtherAmount3 : 0);
          _sqlparams.push(req.body.Total ? req.body.Total : 0);
          _sqlparams.push(body.MedicalExpenses ? body.MedicalExpenses : '' );
          _sqlparams.push(body.GiftsExpenses ? body.GiftsExpenses : '' );
          _sqlparams.push(body.JobsExpenses ? body.JobsExpenses : '' );
          _sqlparams.push(body.OthersExpenses ? body.OthersExpenses : '' );
          _sqlparams.push(body.medicaltotal ? body.medicaltotal : 0 );
          _sqlparams.push(body.gifttotal ? body.gifttotal : 0 );
          _sqlparams.push(body.jobtotal ? body.jobtotal : 0 );
          _sqlparams.push(body.othertotal ? body.othertotal : 0 );
         
          _sqlparams.push(req.params.SchaId);
   
      var queryUpdate = "UPDATE " + table + " SET `Dc1`= ?,`Dc2`= ?,`Dc3`= ?,`Dc4`= ?,`Dc5`= ?,`DcAmount1`= ?,`DcAmount2`= ?,`DcAmount3`= ?, `DcAmount4`= ?,`DcAmount5`= ?,`Gift1`= ?,`Gift2`= ?,`GiftAmount1`= ?,`GiftAmount2`= ?,`Job1`= ?,`Job2`= ?,`Job3`= ?,`Job4`= ?,`Job5`= ?,`JobAmount1`= ?,`JobAmount2`= ?,`JobAmount3`= ?,`JobAmount4`= ?,`JobAmount5`= ?,`Other1`= ?,`Other2`= ?,`Other3`= ?,`OtherAmount1`= ?,`OtherAmount2`= ?,`OtherAmount3`= ?,`Total`= ?,`MedicalExpenses`= ?,`GiftsExpenses`= ?,`JobsExpenses`= ?,`OthersExpenses`= ?,`medicaltotal`= ?,`gifttotal`= ?,`jobtotal`= ?,`othertotal`= ?  WHERE Id =  ?;";

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
      res.send(200, {success: false, message: "The Form id is required"});
      return next(false);  
    }
    return next();
  });

  server.del('/form_scha/:formId/:userId', (req, res, next) => {
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

