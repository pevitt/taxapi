

  function insert_into_forms_detail (connection, userId, insertId, res, next){
    queryInsert = "INSERT INTO `admin_tax_pupilo`.`tx_forms_detail`(`UserId`,`FormInfoId`,`FormId`,`Status`) VALUES (?,?,?,0);";
            
            
    connection.query(queryInsert , [userId , 1, insertId], function (err, result, fields) {

      if (err){
        res.send(500, {message: err});
        connection.end();
        return next(false);
      }
      res.send(200, {success: true, message:"Inserted successfully"});
      return next(false);

    });
  }
            




module.exports.insert_into_forms_detail = insert_into_forms_detail;