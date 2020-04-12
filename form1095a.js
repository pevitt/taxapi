'use strict';

var mysql = require('mysql');
var formFunctions = require('./formsFunctions.js');

module.exports = function(server, db_config){

  var connection; 
  var table = 'tx_form_1095a';

  server.get('/form_1095a/has/:userId/:Year', (req, res, next) => {
    conectionDB();
    return formFunctions.getByUserNYear(req, res, next, table, connection);
    
  });

  server.get('/form_1095a/has/:userId', (req, res, next) => {
    conectionDB();
    return formFunctions.getByUser(req, res, next, table, connection);
    
  });

  server.post('/form_1095a/:userId', (req, res, next) => {

    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body != undefined &&
          req.body.hasOwnProperty('ts') && req.body.ts != "" &&
          req.body.hasOwnProperty('MarketplaceId') && req.body.MarketplaceId != "" &&
          req.body.hasOwnProperty('MarketplaceAss') && req.body.MarketplaceAss != "" &&  
          req.body.hasOwnProperty('PolicyName') && req.body.PolicyName != "" &&
          req.body.hasOwnProperty('PolicyStartDate') && req.body.PolicyStartDate != "" &&
          req.body.hasOwnProperty('PolicyTerminateDate') && req.body.PolicyTerminateDate != "" 
          )
      {

        
          var _sqlparams = loadData(req.body);

          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.params.userId);
          _sqlparams.push(req.body.Year);
            //if record doesn't exist we create it
            //inserting new rpersonal profile
            var queryInsert = "INSERT INTO " + table + " ( `ts`, `MarketplaceId`, `MarketplaceAss`, `PolicyName`, `PolicyStartDate`, `PolicyTerminateDate`, `ssn1`, `FirstName1`, `LastName1`, `DateBirth1`, `StartDate1`, `TerminationDate1`, `ssn2`, `FirstName2`, `LastName2`, `DateBirth2`, `StartDate2`, `TerminationDate2`, `ssn3`, `FirstName3`, `LastName3`, `DateBirth3`, `StartDate3`, `TerminationDate3`, `ssn4`, `FirstName4`, `LastName4`, `DateBirth4`, `StartDate4`, `TerminationDate4`, `MJan`, `MFeb`, `MMar`, `MApr`, `MMay`, `MJun`, `MJul`, `MAgo`, `MSep`, `MOct`, `MNov`, `MDic`, `PJan`, `PFeb`, `PMar`, `PApr`, `PMay`, `PJun`, `PJul`, `PAgo`, `PSep`, `POct`, `PNov`, `PDic`, `AJan`, `AFeb`, `AMar`, `AApr`, `AMay`, `AJun`, `AJul`, `AAgo`, `ASep`, `AOct`, `ANov`, `ADic`, `AnnualM`, `AnnualP`, `AnnualA`, `SSNSha1`, `StartMonth1`, `StopMonth1`, `PremiunAllo1`, `SLCSP1`, `PTC1`, `SSNSha2`, `StartMonth2`, `StopMonth2`, `PremiunAllo2`, `SLCSP12`, `PTC12`, `FormName`,`FormInfoId`,`UserId`,`Year`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

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
         
        if(req.body == undefined){
          fields += "ts, MarketplaceId, MarketplaceAss, PolicyName, PolicyStartDate, PolicyTerminateDate";
         
        }else{
          if(!(req.body.hasOwnProperty('ts') && req.body.ts != ""))
            fields += "ts";
          
          
          if(!(req.body.hasOwnProperty('MarketplaceId') && req.body.MarketplaceId != "")){
            if(fields != "")
              fields += ", "
            fields += "MarketplaceId";
          }

          if(!(req.body.hasOwnProperty('MarketplaceAss') && req.body.MarketplaceAss != "")){
            if(fields != "")
              fields += ", "
            fields += "MarketplaceAss";
          }

          if(!(req.body.hasOwnProperty('PolicyName') && req.body.PolicyName != "")){
            if(fields != "")
              fields += ", "
            fields += "PolicyName";
          }

          if(!(req.body.hasOwnProperty('PolicyStartDate') && req.body.PolicyStartDate != "")){
            if(fields != "")
              fields += ", "
            fields += "PolicyStartDate";
          }

          if(!(req.body.hasOwnProperty('PolicyTerminateDate') && req.body.PolicyTerminateDate != "" )){
            if(fields != "")
              fields += ", "
            fields += "PolicyTerminateDate";
          }

          
        }

        res.send(200, {success: false, message: "One of this fields has no value: " + fields});
        return next(false);
     }

    }else{
      res.send(200, {success: false, message: "User Id is required"});
      return next(false);  
    }
    return next();
  });
  
  server.put('/form_1095a/:form1095aID', (req, res, next) => {
    if(req.params.form1095aID && isInteger(req.params.form1095aID) ){

      var _sqlparams = loadData(req.body);
         
      _sqlparams.push(req.params.form1095aID);

      var queryUpdate = "UPDATE " + table + " SET `ts` = ?, `MarketplaceId` = ?, `MarketplaceAss` = ?, `PolicyName` = ?, `PolicyStartDate` = ?, `PolicyTerminateDate` = ?, `ssn1` = ?, `FirstName1` = ?, `LastName1` = ?, `DateBirth1` = ?, `StartDate1` = ?, `TerminationDate1` = ?, `ssn2` = ?, `FirstName2` = ?, `LastName2` = ?, `DateBirth2` = ?, `StartDate2` = ?, `TerminationDate2` = ?, `ssn3` = ?, `FirstName3` = ?, `LastName3` = ?, `DateBirth3` = ?, `StartDate3` = ?, `TerminationDate3` = ?, `ssn4` = ?, `FirstName4` = ?, `LastName4` = ?, `DateBirth4` = ?, `StartDate4` = ?, `TerminationDate4` = ?, `MJan` = ?, `MFeb` = ?, `MMar` = ?, `MApr` = ?, `MMay` = ?, `MJun` = ?, `MJul` = ?, `MAgo` = ?, `MSep` = ?, `MOct` = ?, `MNov` = ?, `MDic` = ?, `PJan` = ?, `PFeb` = ?, `PMar` = ?, `PApr` = ?, `PMay` = ?, `PJun` = ?, `PJul` = ?, `PAgo` = ?, `PSep` = ?, `POct` = ?, `PNov` = ?, `PDic` = ?, `AJan` = ?, `AFeb` = ?, `AMar` = ?, `AApr` = ?, `AMay` = ?, `AJun` = ?, `AJul` = ?, `AAgo` = ?, `ASep` = ?, `AOct` = ?, `ANov` = ?, `ADic` = ?, `AnnualM` = ?, `AnnualP` = ?, `AnnualA` = ?, `SSNSha1` = ?, `StartMonth1` = ?, `StopMonth1` = ?, `PremiunAllo1` = ?, `SLCSP1` = ?, `PTC1` = ?, `SSNSha2` = ?, `StartMonth2` = ?, `StopMonth2` = ?, `PremiunAllo2` = ?, `SLCSP12` = ?, `PTC12` = ?, `FormName` = ? WHERE `Id` = ?;";

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
      res.send(200, {success: false, message: "The form1095a  id is required"});
      return next(false);  
    }
    return next();
  });

  server.del('/form_1095a/:formId/:userId', (req, res, next) => {
    conectionDB();
    return formFunctions.delRecord(req, res, next, table, connection);  
  });

  function loadData(body){

    var _sqlparams = [];  

    _sqlparams.push(body.ts ? body.ts : "");

    _sqlparams.push(body.MarketplaceId ? body.MarketplaceId : "");
    _sqlparams.push(body.MarketplaceAss ? body.MarketplaceAss : "");
    _sqlparams.push(body.PolicyName ? body.PolicyName : "");
    _sqlparams.push(body.PolicyStartDate ? body.PolicyStartDate : "");
    _sqlparams.push(body.PolicyTerminateDate ? body.PolicyTerminateDate : "");
    _sqlparams.push(body.ssn1 ? body.ssn1 : "");
    _sqlparams.push(body.FirstName1 ? body.FirstName1 : "");
    _sqlparams.push(body.LastName1 ? body.LastName1 : "");
    _sqlparams.push(body.DateBirth1 ? body.DateBirth1 : "");
    _sqlparams.push(body.StartDate1 ? body.StartDate1 : "");
    _sqlparams.push(body.TerminationDate1 ? body.TerminationDate1 : "");
    _sqlparams.push(body.ssn2 ? body.ssn2 : "");
    _sqlparams.push(body.FirstName2 ? body.FirstName2 : "");
    _sqlparams.push(body.LastName2 ? body.LastName2 : "");
    _sqlparams.push(body.DateBirth2 ? body.DateBirth2 : "");
    _sqlparams.push(body.StartDate2 ? body.StartDate2 : "");
    _sqlparams.push(body.TerminationDate2 ? body.TerminationDate2 : "");
    _sqlparams.push(body.ssn3 ? body.ssn3 : "");
    _sqlparams.push(body.FirstName3 ? body.FirstName3 : "");
    _sqlparams.push(body.LastName3 ? body.LastName3 : "");
    _sqlparams.push(body.DateBirth3 ? body.DateBirth3 : "");
    _sqlparams.push(body.StartDate3 ? body.StartDate3 : "");
    _sqlparams.push(body.TerminationDate3 ? body.TerminationDate3 : "");
    _sqlparams.push(body.ssn4 ? body.ssn4 : "");
    _sqlparams.push(body.FirstName4 ? body.FirstName4 : "");
    _sqlparams.push(body.LastName4 ? body.LastName4 : "");
    _sqlparams.push(body.DateBirth4 ? body.DateBirth4 : "");
    _sqlparams.push(body.StartDate4 ? body.StartDate4 : "");
    _sqlparams.push(body.TerminationDate4 ? body.TerminationDate4 : "");
    _sqlparams.push(body.MJan ? body.MJan : 0);  
    _sqlparams.push(body.MFeb ? body.MFeb : 0);  
    _sqlparams.push(body.MMar ? body.MMar : 0);  
    _sqlparams.push(body.MApr ? body.MApr : 0);  
    _sqlparams.push(body.MMay ? body.MMay : 0);  
    _sqlparams.push(body.MJun ? body.MJun : 0);  
    _sqlparams.push(body.MJul ? body.MJul : 0);  
    _sqlparams.push(body.MAgo ? body.MAgo : 0);  
    _sqlparams.push(body.MSep ? body.MSep : 0);  
    _sqlparams.push(body.MOct ? body.MOct : 0);  
    _sqlparams.push(body.MNov ? body.MNov : 0);  
    _sqlparams.push(body.MDic ? body.MDic : 0);  
    _sqlparams.push(body.PJan ? body.PJan : 0);  
    _sqlparams.push(body.PFeb ? body.PFeb : 0);  
    _sqlparams.push(body.PMar ? body.PMar : 0);  
    _sqlparams.push(body.PApr ? body.PApr : 0);  
    _sqlparams.push(body.PMay ? body.PMay : 0);  
    _sqlparams.push(body.PJun ? body.PJun : 0);  
    _sqlparams.push(body.PJul ? body.PJul : 0);  
    _sqlparams.push(body.PAgo ? body.PAgo : 0);  
    _sqlparams.push(body.PSep ? body.PSep : 0);  
    _sqlparams.push(body.POct ? body.POct : 0);  
    _sqlparams.push(body.PNov ? body.PNov : 0);  
    _sqlparams.push(body.PDic ? body.PDic : 0);  
    _sqlparams.push(body.AJan ? body.AJan : 0);  
    _sqlparams.push(body.AFeb ? body.AFeb : 0);  
    _sqlparams.push(body.AMar ? body.AMar : 0);  
    _sqlparams.push(body.AApr ? body.AApr : 0);  
    _sqlparams.push(body.AMay ? body.AMay : 0);  
    _sqlparams.push(body.AJun ? body.AJun : 0);  
    _sqlparams.push(body.AJul ? body.AJul : 0);  
    _sqlparams.push(body.AAgo ? body.AAgo : 0);  
    _sqlparams.push(body.ASep ? body.ASep : 0);  
    _sqlparams.push(body.AOct ? body.AOct : 0);  
    _sqlparams.push(body.ANov ? body.ANov : 0);  
    _sqlparams.push(body.ADic ? body.ADic : 0);  
    _sqlparams.push(body.AnnualM ? body.AnnualM : 0);  
    _sqlparams.push(body.AnnualP ? body.AnnualP : 0);  
    _sqlparams.push(body.AnnualA ? body.AnnualA : 0);  
    _sqlparams.push(body.SSNSha1 ? body.SSNSha1 : "");
    _sqlparams.push(body.StartMonth1 ? body.StartMonth1 : "");
    _sqlparams.push(body.StopMonth1 ? body.StopMonth1 : "");
    _sqlparams.push(body.PremiunAllo1 ? body.PremiunAllo1 : 0);  
    _sqlparams.push(body.SLCSP1 ? body.SLCSP1 : 0);  
    _sqlparams.push(body.PTC1 ? body.PTC1 : 0);  
    _sqlparams.push(body.SSNSha2 ? body.SSNSha2 : "");
    _sqlparams.push(body.StartMonth2 ? body.StartMonth2 : "");
    _sqlparams.push(body.StopMonth2 ? body.StopMonth2 : "");
    _sqlparams.push(body.PremiunAllo2 ? body.PremiunAllo2 : 0);  
    _sqlparams.push(body.SLCSP12 ? body.SLCSP12 : 0);  
    _sqlparams.push(body.PTC12 ? body.PTC12 : 0);  
    _sqlparams.push(body.FormName ? body.FormName : "");
     

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

