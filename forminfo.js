'use strict';

var mysql = require('mysql');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_forms_info';
  var detail = 'tx_forms_detail';
  var unemploy = 'tx_form_unemployment';
  var childcare = 'tx_form_childcare';
  var w2g = 'tx_form_w2g';
  var form88 = 'tx_form_8863';

  var form1095a = 'tx_form_1095a';
  var form1099m = 'tx_form_1099m';
  var form1099r = 'tx_form_1099r';
  var scha = 'tx_form_scha';
  var schb = '  tx_form_schb';
  var schc = 'tx_form_schc';
  var schl = 'tx_form_schl';

  var user = 'tx_user';
  
  server.get('/forminfo/byname/:Name', (req, res, next) => {

      var query = "SELECT * FROM " + table + " where NameForm = ?";

      conectionDB();

      connection.query(query , [req.params.Name] , function (err, result, fields) {
        
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
    return next();
  });

  server.get('/forminfo/', (req, res, next) => {

      var query = "SELECT * FROM " + table;

      conectionDB();

      connection.query(query , [] , function (err, result, fields) {
        
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
    return next();
  });

  server.get('/forminfo/has/:FormId', (req, res, next) => {

    if(req.params.FormId && isInteger(req.params.FormId) ){

      var query = "SELECT * FROM " + table + " where Id = ?";

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

  server.get('/forminfo/listforms/:UserId', (req, res, next) => {

    if(req.params.UserId && isInteger(req.params.UserId) ){
      
      var userid = req.params.UserId;

      var query = "SELECT d.UserId, d.FormInfoId, d.Status, i.NameForm, i.Amount, Count(i.Amount) as Counts, SUM(i.Amount) as Total FROM " + detail + " AS d INNER JOIN " + table + " AS i ON d.FormInfoId = i.Id";
      query = query + "  INNER JOIN " + unemploy + " AS u ON u.Id = d.FormId  AND u.FormInfoId = d.FormInfoId";
      query = query + "  where d.UserId = ? AND d.Status = 0 GROUP BY d.UserId, d.FormInfoId, d.Status,i.NameForm, i.Amount";
      query = query + " UNION ALL";
      query = query + " SELECT d.UserId, d.FormInfoId, d.Status, i.NameForm, i.Amount, Count(i.Amount) as Counts, SUM(i.Amount) as Total FROM " + detail + " AS d INNER JOIN " + table + " AS i ON d.FormInfoId = i.Id";
      query = query + "  INNER JOIN " + childcare + " AS u ON u.Id = d.FormId  AND u.FormInfoId = d.FormInfoId";
      query = query + "  where d.UserId = " + userid + " AND d.Status = 0 GROUP BY d.UserId, d.FormInfoId, d.Status,i.NameForm, i.Amount";
      query = query + " UNION ALL";
      query = query + " SELECT d.UserId, d.FormInfoId, d.Status, i.NameForm, i.Amount, Count(i.Amount) as Counts, SUM(i.Amount) as Total FROM " + detail + " AS d INNER JOIN " + table + " AS i ON d.FormInfoId = i.Id";
      query = query + "  INNER JOIN " + form88 + " AS u ON u.Id = d.FormId  AND u.FormInfoId = d.FormInfoId";
      query = query + "  where d.UserId = " + userid + " AND d.Status = 0 GROUP BY d.UserId, d.FormInfoId, d.Status,i.NameForm, i.Amount";
      query = query + " UNION ALL";
      query = query + " SELECT d.UserId, d.FormInfoId, d.Status, i.NameForm, i.Amount, Count(i.Amount) as Counts, SUM(i.Amount) as Total FROM " + detail + " AS d INNER JOIN " + table + " AS i ON d.FormInfoId = i.Id";
      query = query + "  INNER JOIN " + w2g + " AS u ON u.id = d.FormId  AND u.FormInfoId = d.FormInfoId";
      query = query + "  where d.UserId = " + userid + " AND d.Status = 0 GROUP BY d.UserId, d.FormInfoId, d.Status,i.NameForm, i.Amount";
      query = query + " UNION ALL";
      query = query + " SELECT d.UserId, d.FormInfoId, d.Status, i.NameForm, i.Amount, Count(i.Amount) as Counts, SUM(i.Amount) as Total FROM " + detail + " AS d INNER JOIN " + table + " AS i ON d.FormInfoId = i.Id";
      query = query + "  INNER JOIN " + form1099r + " AS u ON u.Id = d.FormId  AND u.FormInfoId = d.FormInfoId";
      query = query + "  where d.UserId = " + userid + " AND d.Status = 0 GROUP BY d.UserId, d.FormInfoId, d.Status,i.NameForm, i.Amount";
      query = query + " UNION ALL";
      query = query + " SELECT d.UserId, d.FormInfoId, d.Status, i.NameForm, i.Amount, Count(i.Amount) as Counts, SUM(i.Amount) as Total FROM " + detail + " AS d INNER JOIN " + table + " AS i ON d.FormInfoId = i.Id";
      query = query + "  INNER JOIN " + form1099m + " AS u ON u.Id = d.FormId  AND u.FormInfoId = d.FormInfoId";
      query = query + "  where d.UserId = " + userid + " AND d.Status = 0 GROUP BY d.UserId, d.FormInfoId, d.Status,i.NameForm, i.Amount";
      query = query + " UNION ALL";
      query = query + " SELECT d.UserId, d.FormInfoId, d.Status, i.NameForm, i.Amount, Count(i.Amount) as Counts, SUM(i.Amount) as Total FROM " + detail + " AS d INNER JOIN " + table + " AS i ON d.FormInfoId = i.Id";
      query = query + "  INNER JOIN " + form1095a + " AS u ON u.Id = d.FormId  AND u.FormInfoId = d.FormInfoId";
      query = query + "  where d.UserId = " + userid + " AND d.Status = 0 GROUP BY d.UserId, d.FormInfoId, d.Status,i.NameForm, i.Amount";
      query = query + " UNION ALL";
      query = query + " SELECT d.UserId, d.FormInfoId, d.Status, i.NameForm, i.Amount, Count(i.Amount) as Counts, SUM(i.Amount) as Total FROM " + detail + " AS d INNER JOIN " + table + " AS i ON d.FormInfoId = i.Id";
      query = query + "  INNER JOIN " + schl + " AS u ON u.Id = d.FormId  AND u.FormInfoId = d.FormInfoId";
      query = query + "  where d.UserId = " + userid + " AND d.Status = 0 GROUP BY d.UserId, d.FormInfoId, d.Status,i.NameForm, i.Amount";
      query = query + " UNION ALL";
      query = query + " SELECT d.UserId, d.FormInfoId, d.Status, i.NameForm, i.Amount, Count(i.Amount) as Counts, SUM(i.Amount) as Total FROM " + detail + " AS d INNER JOIN " + table + " AS i ON d.FormInfoId = i.Id";
      query = query + "  INNER JOIN " + schc + " AS u ON u.Id = d.FormId  AND u.FormInfoId = d.FormInfoId";
      query = query + "  where d.UserId = " + userid + " AND d.Status = 0 GROUP BY d.UserId, d.FormInfoId, d.Status,i.NameForm, i.Amount";
      query = query + " UNION ALL";
      query = query + " SELECT d.UserId, d.FormInfoId, d.Status, i.NameForm, i.Amount, Count(i.Amount) as Counts, SUM(i.Amount) as Total FROM " + detail + " AS d INNER JOIN " + table + " AS i ON d.FormInfoId = i.Id";
      query = query + "  INNER JOIN " + schb + " AS u ON u.Id = d.FormId  AND u.FormInfoId = d.FormInfoId";
      query = query + "  where d.UserId = " + userid + " AND d.Status = 0 GROUP BY d.UserId, d.FormInfoId, d.Status,i.NameForm, i.Amount";
      query = query + " UNION ALL";
      query = query + " SELECT d.UserId, d.FormInfoId, d.Status, i.NameForm, i.Amount, Count(i.Amount) as Counts, SUM(i.Amount) as Total FROM " + detail + " AS d INNER JOIN " + table + " AS i ON d.FormInfoId = i.Id";
      query = query + "  INNER JOIN " + scha + " AS u ON u.Id = d.FormId  AND u.FormInfoId = d.FormInfoId";
      query = query + "  where d.UserId = " + userid + " AND d.Status = 0 GROUP BY d.UserId, d.FormInfoId, d.Status,i.NameForm, i.Amount";

      //console.log('Mysql:', query);

      conectionDB();
 
      connection.query(query , [req.params.UserId], function (err, result, fields) {
        
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

  server.put('/forminfo/:FormInfoId', (req, res, next) => {
    if(req.params.FormInfoId && isInteger(req.params.FormInfoId) ){

      var _sqlparams = [];

          // _sqlparams.push(req.body.Id);
          // _sqlparams.push(req.body.NameForm);
          _sqlparams.push(req.body.Amount);
          // _sqlparams.push(req.body.Status);
          _sqlparams.push(req.params.FormInfoId);
   
      var queryInsert = "UPDATE " + table + " SET `Amount` = ? WHERE `Id` = ?;";

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
      res.send(200, {success: false, message: "The Form id is required"});
      return next(false);  
    }
    return next();
  });

  server.put('/forminfo/payforms/:UserId', (req, res, next) => {

    if(req.params.UserId && isInteger(req.params.UserId) ){

   
      var queryInsert = "UPDATE `tx_forms_detail` SET `Status` = 1 WHERE `UserId` = ?;";

      conectionDB();

      connection.query(queryInsert , [req.params.UserId], function (err, result, fields) {

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
      res.send(200, {success: false, message: "The User Id id is required"});
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
      console.log(table + ' db error', err.code);
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

