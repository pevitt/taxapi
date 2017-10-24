

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

function getByUserNYear(req, res, next, table){
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
}

function getByUser(req, res, next, table) {
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
}

function isInteger(str){
    var reg = /^\d+$/;
    return reg.test(str);
}


module.exports.insert_into_forms_detail = insert_into_forms_detail;
module.exports.getByUserNYear = getByUserNYear;
module.exports.getByUser = getByUser;