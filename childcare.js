'use strict';

var mysql = require('mysql');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_form_childcare';

  server.get('/form_childcare/has/:userId', (req, res, next) => {

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

  server.post('/form_childcare/:userId', (req, res, next) => {
    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body.hasOwnProperty('City') && req.body.City != "" &&  
          req.body.hasOwnProperty('State') && req.body.State != "" && 
          req.body.hasOwnProperty('CareProvider') && req.body.CareProvider != "" && 
          req.body.hasOwnProperty('ssn') && req.body.ssn != "")
      {

        
          var _sqlparams = [];

          _sqlparams.push(req.body.ssn);
          _sqlparams.push(req.body.ein);
          _sqlparams.push(req.body.AmoundPaid);
          _sqlparams.push(req.body.CareProvider);
          _sqlparams.push(req.body.Street);
          _sqlparams.push(req.body.City);
          _sqlparams.push(req.body.State);
          _sqlparams.push(req.body.Zip);
          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.params.userId);

          console.log("insert child care: ",_sqlparams);

            //if record doesn't exist we create it
            //inserting new rpersonal profile
            var queryInsert = "INSERT INTO " + table + " (`ssn`,`ein`,`AmoundPaid`,`CareProvider`,`Street`,`City`,`State`,`Zip`,`FormInfoId`,`UserID`) VALUES (?,?,?,?,?,?,?,?,?,?);";

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
          
          // END inserting new personal profil
        
        
     }else{    
          
          console.log("req.body.hasOwnProperty('ssn') ",req.body.hasOwnProperty('ssn') );
          console.log("req.body.ssn != '' ",req.body.ssn != "" );
          
          console.log("req.body.hasOwnProperty('City') ",req.body.hasOwnProperty('City') );
          console.log("req.body.City != '' ",req.body.City != "" );
          
          console.log("req.body.hasOwnProperty('CareProvider') ",req.body.hasOwnProperty('CareProvider') );
          console.log("req.body.CareProvider != '' ",req.body.CareProvider != "" );
          console.log("req.body.hasOwnProperty('State') ",req.body.hasOwnProperty('State') );
          console.log("req.body.State != '' ",req.body.State != "" );
          

          console.log(req.body);

        res.send(200, {success: false, message: "One of this fields has no value: State,City,CareProvider,ssn"});
        return next(false);
     }

    }else{
      res.send(200, {success: false, message: "User Id is required"});
      return next(false);  
    }
    return next();
  });
  
  server.put('/form_childcare/:ChildCareID', (req, res, next) => {
    if(req.params.ChildCareID && isInteger(req.params.ChildCareID) ){

      var _sqlparams = [];

           _sqlparams.push(req.body.ssn);
          _sqlparams.push(req.body.ein);
          _sqlparams.push(req.body.AmoundPaid);
          _sqlparams.push(req.body.CareProvider);
          _sqlparams.push(req.body.Street);
          _sqlparams.push(req.body.City);
          _sqlparams.push(req.body.State);
          _sqlparams.push(req.body.Zip);
         
          _sqlparams.push(req.params.ChildCareID);
   
      var queryUpdate = "UPDATE " + table + " SET `ssn` = ?,`ein` = ?,`AmoundPaid` = ?,`CareProvider` = ?,`Street` = ?,`City` = ?,`State` = ?,`Zip` = ?  WHERE Id =  ?;";

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
      res.send(200, {success: false, message: "The ChildCare id is required"});
      return next(false);  
    }
    return next();
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

