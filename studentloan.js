'use strict';

var mysql = require('mysql');

var formFunctions = require('./formsFunctions.js');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_form_studentloan';

  server.get('/form_studentloan/has/:userId/:Year', (req, res, next) => {

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

  server.get('/form_studentloan/getstudent/:userId', (req, res, next) => {

    if(req.params.userId && isInteger(req.params.userId) ){

      var user = req.params.userId;

      var query = "SELECT CONCAT(FirstName,' ', LastName) As Name FROM `tx_personal_info` WHERE UserID = ? UNION All SELECT CONCAT(FirstName,' ', LastName) As Name FROM `tx_form_spouse` WHERE UserID = " + user;

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

  server.get('/form_studentloan/has/:userId', (req, res, next) => {

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

  

  server.post('/form_studentloan/:userId', (req, res, next) => {
    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body.hasOwnProperty('NameLender') && req.body.NameLender != "" &&  
          req.body.hasOwnProperty('Student') && req.body.Student != "" && 
          req.body.hasOwnProperty('InterestPaid') && req.body.InterestPaid)
      {

        
          var _sqlparams = [];

          _sqlparams.push(req.body.NameLender);
          _sqlparams.push(req.body.Student);
          _sqlparams.push(req.body.InterestPaid);
          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.params.userId);
          _sqlparams.push(req.body.Year);

          console.log("insert studentloan: ",_sqlparams);

            //if record doesn't exist we create it
            //inserting new rpersonal profile
            var queryInsert = "INSERT INTO " + table + " (`NameLender`,`Student`,`InterestPaid`,`FormInfoId`,`UserID`, `Year`) VALUES (?,?,?,?,?,?);";

            conectionDB();

            connection.query(queryInsert , _sqlparams, function (err, result, fields) {

              if (err){
                res.send(500, {message: err});
                connection.end();
                return next(false);
              }

              res.send(200, {success: true, message:"Inserted successfully"});

              connection.end();

              return next(false);
            });
          
        
        
     }else{    
          
          console.log("req.body.hasOwnProperty('NameLender') ",req.body.hasOwnProperty('NameLender') );
          console.log("req.body.NameLender != '' ",req.body.NameLender != "" );
          
          console.log("req.body.hasOwnProperty('Student') ",req.body.hasOwnProperty('Student') );
          console.log("req.body.Student != '' ",req.body.Student != "" );
          
          console.log("req.body.hasOwnProperty('InterestPaid') ",req.body.hasOwnProperty('InterestPaid') );
          console.log("req.body.InterestPaid != '' ",req.body.CareProvider != "" );
          
          

          console.log(req.body);

        res.send(200, {success: false, message: "One of this fields has no value: NameLender,Student,InterestPaid"});
        return next(false);
     }

    }else{
      res.send(200, {success: false, message: "User Id is required"});
      return next(false);  
    }
    return next();
  });
  
  server.put('/form_studentloan/:StudentLoanID', (req, res, next) => {
    if(req.params.StudentLoanID && isInteger(req.params.StudentLoanID) ){

      var _sqlparams = [];

          _sqlparams.push(req.body.NameLender);
          _sqlparams.push(req.body.Student);
          _sqlparams.push(req.body.InterestPaid);
         
          _sqlparams.push(req.params.StudentLoanID);
   
      var queryUpdate = "UPDATE " + table + " SET `NameLender` = ?,`Student` = ?,`InterestPaid` = ?  WHERE Id =  ?;";

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
      res.send(200, {success: false, message: "The Student Loan id is required"});
      return next(false);  
    }
    return next();
  });

  server.del('/form_studentloan/:formId/:userId', (req, res, next) => {
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

