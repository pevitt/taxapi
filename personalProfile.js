'use strict';

var mysql = require('mysql');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_personal_info';
  //obtener
  server.get('/personal_info/has/:userId', (req, res, next) => {

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
          res.json({success:true , hasdata: true , data: result[0]});
          connection.end();
          return next();
        }else{
          //missin parameter
          res.json({success:false , hasdata: false});
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
  //crear 
  server.post('/personal_info/:userId', (req, res, next) => {
    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body.hasOwnProperty('FirstName') && req.body.FirstName != "" && 
          req.body.hasOwnProperty('LastName') && req.body.LastName != "" && 
          req.body.hasOwnProperty('BirthDate') && req.body.BirthDate != "" && 
          req.body.hasOwnProperty('Ssn') && req.body.Ssn != "")
      {

        //querying if a personal profile already exists
        var querySelect = "SELECT * FROM " + table + " WHERE UserID =  ?";

        conectionDB();

        connection.query(querySelect , [req.params.userId], function (err, result, fields) {

          if (err){
            res.send(500, {message: err});
            connection.end();
            return next(false);
          }
          connection.end();
          var _sqlparams = [];

          _sqlparams.push(req.body.FirstName);
          _sqlparams.push(req.body.Minitial);
          _sqlparams.push(req.body.LastName);
          _sqlparams.push(req.body.JrSr);
          _sqlparams.push(req.body.BirthDate);
          _sqlparams.push(req.body.Ssn);
          _sqlparams.push(req.body.Occupation);
          _sqlparams.push(req.body.Address);
          _sqlparams.push(req.body.Apt);
          _sqlparams.push(req.body.City);
          _sqlparams.push(req.body.State);
          _sqlparams.push(req.body.Zip);
          _sqlparams.push(req.body.PhoneNumber1);
          _sqlparams.push(req.body.Ext1);
          _sqlparams.push(req.body.PhoneType1);
          _sqlparams.push(req.body.PhoneNumber2);
          _sqlparams.push(req.body.Ext2);
          _sqlparams.push(req.body.PhoneType2);
          _sqlparams.push(req.body.StateResident);
          _sqlparams.push(req.body.LivedAnother2015);
          _sqlparams.push(req.body.PreviusState);
          _sqlparams.push(req.body.DateResidentNY);
          _sqlparams.push(req.body.Tax);
          _sqlparams.push(req.body.Legally);
          _sqlparams.push(req.body.MaritalStatus);
          _sqlparams.push(req.body.MarriedStatus);
          _sqlparams.push(req.body.Spouse);
          _sqlparams.push(req.params.userId);

          console.log("insert personal profile: ",_sqlparams);

          //if record exist we should update
          if(result != undefined && result[0] != undefined){

            //if record does exist we update it
            var queryInsert = "UPDATE " + table + " SET `FirstName` = ?,`Minitial` = ?,`LastName` = ?,`JrSr` = ?,`BirthDate` = ?,`Ssn` = ?,`Occupation` = ?,`Address` = ?,`Apt` = ?,`City` = ?,`State` = ?,`Zip` = ?,`PhoneNumber1` = ?,`Ext1` = ?,`PhoneType1` = ?,`PhoneNumber2` = ?,`Ext2` = ?,`PhoneType2` = ?,`StateResident` = ?,`LivedAnother2015` = ?,`PreviusState` = ?,`DateResidentNY` = ?,`Tax` = ?,`Legally` = ?,`MaritalStatus` = ?,`MarriedStatus` = ?, `Spouse` = ?  WHERE UserID =  ?;";

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

          }else{
            //if record doesn't exist we create it
            //inserting new rpersonal profile
            var queryInsert = "INSERT INTO " + table + " (`FirstName`,`Minitial`,`LastName`,`JrSr`,`BirthDate`,`Ssn`,`Occupation`,`Address`,`Apt`,`City`,`State`,`Zip`,`PhoneNumber1`,`Ext1`,`PhoneType1`,`PhoneNumber2`,`Ext2`,`PhoneType2`,`StateResident`,`LivedAnother2015`,`PreviusState`,`DateResidentNY`,`Tax`,`Legally`,`MaritalStatus`,`MarriedStatus`,`Spouse`,`UserID`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

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
          }
          // END inserting new personal profile
        });
        
        
     }else{    
          
          console.log("req.body.hasOwnProperty('FirstName') ",req.body.hasOwnProperty('FirstName') );
          console.log("req.body.FirstName != '' ",req.body.FirstName != "" );
          
          console.log("req.body.hasOwnProperty('LastName') ",req.body.hasOwnProperty('LastName') );
          console.log("req.body.LastName != '' ",req.body.LastName != "" );
          
          console.log("req.body.hasOwnProperty('BirthDate') ",req.body.hasOwnProperty('BirthDate') );
          console.log("req.body.BirthDate != '' ",req.body.BirthDate != "" );
          console.log("req.body.hasOwnProperty('Ssn') ",req.body.hasOwnProperty('Ssn') );
          console.log("req.body.Ssn != '' ",req.body.Ssn != "" );
          // console.log("req.body.hasOwnProperty('Occupation') ",req.body.hasOwnProperty('Occupation') );
          // console.log("req.body.Occupation != '' ",req.body.Occupation != "" );
          // console.log("req.body.hasOwnProperty('Address') ",req.body.hasOwnProperty('Address') );
          // console.log("req.body.Address != '' ",req.body.Address != "" );
          // console.log("req.body.hasOwnProperty('Apt') ",req.body.hasOwnProperty('Apt') );
          // console.log("req.body.Apt != '' ",req.body.Apt != "" );
          // console.log("req.body.hasOwnProperty('City') ",req.body.hasOwnProperty('City') );
          // console.log("req.body.City != '' ",req.body.City != "" );
          // console.log("req.body.hasOwnProperty('State') ",req.body.hasOwnProperty('State') );
          // console.log("req.body.State != '' ",req.body.State != "" );
          // console.log("req.body.hasOwnProperty('Zip') ",req.body.hasOwnProperty('Zip') );
          // console.log("req.body.Zip != '' ",req.body.Zip != "" );
          // console.log("req.body.hasOwnProperty('PhoneType1') ",req.body.hasOwnProperty('PhoneType1') );
          // console.log("req.body.PhoneType1 != '' ",req.body.PhoneType1 != "" );
          // console.log("req.body.hasOwnProperty('PhoneNumber1') ",req.body.hasOwnProperty('PhoneNumber1') );
          // console.log("req.body.PhoneNumber1 != '' ",req.body.PhoneNumber1 != "" );
          // console.log("req.body.hasOwnProperty('Ext1') ",req.body.hasOwnProperty('Ext1') );
          // console.log("req.body.Ext1 != '' ",req.body.Ext1 != "" );
          // console.log("req.body.hasOwnProperty('StateResident') ",req.body.hasOwnProperty('StateResident') );
          // console.log("req.body.StateResident != '' ",req.body.StateResident != "" );
          // console.log("req.body.hasOwnProperty('LivedAnother2015') ",req.body.hasOwnProperty('LivedAnother2015') );
          // console.log("req.body.LivedAnother2015 != '' ",req.body.LivedAnother2015 != "" );
          // console.log("req.body.hasOwnProperty('Tax') ",req.body.hasOwnProperty('Tax') );
          // console.log("req.body.Tax != '' ",req.body.Tax != "" );
          // console.log("req.body.hasOwnProperty('Legally') ",req.body.hasOwnProperty('Legally') );
          // console.log("req.body.Legally != '' ",req.body.Legally != "" );
          // console.log("req.body.hasOwnProperty('MaritalStatus') ",req.body.hasOwnProperty('MaritalStatus') );
          // console.log("req.body.MaritalStatus != '' ",req.body.MaritalStatus != "" );
          // console.log("req.body.hasOwnProperty('Spouse') ",req.body.hasOwnProperty('Spouse') );
          // console.log("req.body.Spouse != '' ",req.body.Spouse != "");

          console.log(req.body);

        res.send(200, {success: false, message: "One of this fields has no value: FirstName,LastName,BirthDate,Ssn"});
        return next(false);
     }

    }else{
      res.send(200, {success: false, message: "User id is required"});
      return next(false);  
    }
    return next();
  });
  //modificar actualizar
  server.put('/personal_info/:personalProfileId', (req, res, next) => {
    if(req.params.personalProfileId && isInteger(req.params.personalProfileId) ){

      var _sqlparams = [];

      _sqlparams.push(req.body.FirstName);
      _sqlparams.push(req.body.Minitial);
      _sqlparams.push(req.body.LastName);
      _sqlparams.push(req.body.JrSr);
      _sqlparams.push(req.body.BirthDate);
      _sqlparams.push(req.body.Ssn);
      _sqlparams.push(req.body.Occupation);
      _sqlparams.push(req.body.Address);
      _sqlparams.push(req.body.Apt);
      _sqlparams.push(req.body.City);
      _sqlparams.push(req.body.State);
      _sqlparams.push(req.body.Zip);
      _sqlparams.push(req.body.PhoneNumber1);
      _sqlparams.push(req.body.Ext1);
      _sqlparams.push(req.body.PhoneType1);
      _sqlparams.push(req.body.PhoneNumber2);
      _sqlparams.push(req.body.Ext2);
      _sqlparams.push(req.body.PhoneType2);
      _sqlparams.push(req.body.StateResident);
      _sqlparams.push(req.body.LivedAnother2015);
      _sqlparams.push(req.body.PreviusState);
      _sqlparams.push(req.body.DateResidentNY);
      _sqlparams.push(req.body.Tax);
      _sqlparams.push(req.body.Legally);
      _sqlparams.push(req.body.MaritalStatus);
      _sqlparams.push(req.body.MarriedStatus);
      _sqlparams.push(req.body.Spouse);
      _sqlparams.push(req.params.personalProfileId);
   
      var queryUpdate = "UPDATE " + table + " SET `FirstName` = ?,`Minitial` = ?,`LastName` = ?,`JrSr` = ?,`BirthDate` = ?,`Ssn` = ?,`Occupation` = ?,`Address` = ?,`Apt` = ?,`City` = ?,`State` = ?,`Zip` = ?,`PhoneNumber1` = ?,`Ext1` = ?,`PhoneType1` = ?,`PhoneNumber2` = ?,`Ext2` = ?,`PhoneType2` = ?,`StateResident` = ?,`LivedAnother2015` = ?,`PreviusState` = ?,`DateResidentNY` = ?,`Tax` = ?,`Legally` = ?,`MaritalStatus` = ?,`MarriedStatus` = ?, `Spouse` = ?  WHERE Id =  ?;";

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
      res.send(200, {success: false, message: "The personal profile id is required"});
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

