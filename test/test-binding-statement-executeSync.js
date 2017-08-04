var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.ODBC()
  , assert = require("assert")
  , exitCode = 0
  ;

db.createConnection(function (err, conn) {
  conn.connect(common.connectionString, function(err)
  {
  conn.createStatement(function (err, stmt) {
    var r, result, caughtError;
      stmt.execute(function(err,result){
      assert.notEqual(err, null);
      stmt.prepare("select 1 + ? as col1", function(err){
      stmt.bind([2], function(err){
      stmt.execute(function(err, result){
      assert.equal(result.constructor.name, "ODBCResult");

      result.fetchAll(function(err, data){
      assert.deepEqual(data, [ { col1: 3 } ]);
      result.close(function(err){
      if(err) return(console.log);
      stmt.execute(function(err, result){
      assert.equal(result.constructor.name, "ODBCResult");

      result.fetchAll(function(err, data){
      assert.deepEqual(data, [ { col1: 3 } ]);
      conn.disconnect(function(err){});
      if (exitCode) {
          console.log("failed");
        }
        else {
          console.log("success");
        }
         });
        });
            });
       });
      });
     });
    });
   });
  });
 });
});
