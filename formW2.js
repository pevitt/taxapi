'use strict';

module.exports = function(server,con){

  server.get('/w2_table/', (req, res, next) => {

    con.query("SELECT * FROM admin_tax_pupilo.w2_table", function (err, result, fields) {
    
      if (err) throw err;
      
      for (var i = result.length - 1; i >= 0; i--) {
        console.log(result[i].form_id);
      };
     
    });

    res.send('hello ' + req.params.name + ' done');
    next();
    
  });


};

