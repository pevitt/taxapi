

function insert_into_forms_detail (connection, userId, insertId, forminfoid,res, next){
  queryInsert = "INSERT INTO `tx_forms_detail`(`UserId`,`FormInfoId`,`FormId`,`Status`) VALUES (?,?,?,0);";
          
          
  connection.query(queryInsert , [userId , forminfoid, insertId], function (err, result, fields) {

    if (err){
      res.send(500, {message: err});
      connection.end();
      return next(false);
    }
    res.send(200, {success: true, message:"Inserted successfully"});
    return next(false);

  });
}

function getByUserNYear(req, res, next, table, connection){
  if(req.params.userId && isInteger(req.params.userId) ){



    var query = "SELECT * FROM " + table + " where UserId = ? AND Year = ?";

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
}

function getByUser(req, res, next, table, connection) {
  if(req.params.userId && isInteger(req.params.userId) ){

    var query = "SELECT * FROM " + table + " where UserId = ?";


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
}

function delRecord(req, res, next, table, connection) {
  if(req.params.formId && isInteger(req.params.formId) && req.params.userId && isInteger(req.params.userId)){
      
      var queryInsert = "SELECT * FROM " + table + " WHERE UserID = ? AND Id = ?";      

      connection.query(queryInsert , [req.params.userId, req.params.formId], function (err, result, fields) { 

        if (err){
          res.send(500, {message: err});
          return next(false);
        }

        if(result != null && result[0] != null){
          //Delete register

          var queryInsert = "Delete FROM " + table + " WHERE UserID = ? AND Id = ?";
          
          connection.query(queryInsert , [req.params.userId, req.params.formId], function (err, result, fields) {

            connection.end();

            if (err){
              res.send(500, {message: err});
              return next(false);
            }

            //message unemployment form doesn't match the user
            res.send(200, {success: true, message:" Form deleted successfully"});
            return next(false);
          });

        }else{
          connection.end();
          //message unemployment form doesn't match the user
          res.send(200, {success: false, message:" Form doens't match with the user"});
          return next(false);
        }

        
      });
    } else{
      connection.end();
      res.send(200, {success: false, message: "The Form id is required"});
      return next(false);  
    }
    return next();
}


function isInteger(str){
    var reg = /^\d+$/;
    return reg.test(str);
}


module.exports.insert_into_forms_detail = insert_into_forms_detail;
module.exports.getByUserNYear = getByUserNYear;
module.exports.getByUser = getByUser;
module.exports.delRecord = delRecord