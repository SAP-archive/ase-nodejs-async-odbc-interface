var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.ODBC()
  , assert = require("assert")
  , exitCode = 0
  ;

db.createConnection(function (err, conn) {

  conn.connect(common.connectionString, function(err){

  common.createTables(conn, function (err, data) {
    test1()

    function test1() {
      conn.beginTransaction(function (err) {
        if (err) {
          console.log("Error beginning transaction.");
          console.log(err);
          exitCode = 1
        }

        conn.exec("insert into " + common.tableName + " (COLINT, COLDATETIME, COLTEXT) VALUES (42, null, null)", function(err, result){


        conn.endTransaction(true, function (err) {
          if (err) {
            console.log("Error rolling back transaction");
            console.log(err);
            exitCode = 2
          }

          conn.exec("select * from " + common.tableName, function(err, result){
          result.fetchAll(function(err, data){

          assert.deepEqual(data, []);
           })
          });
          test2();
        });
       });
      });
    }

   function test2 () {
      conn.beginTransaction(function (err) {
        if (err) {
          console.log("Error beginning transaction");
          console.log(err);
          exitCode = 3
        }

        conn.exec("insert into " + common.tableName + " (COLINT, COLDATETIME, COLTEXT) VALUES (42, null, null)",function(err, result){

        conn.endTransaction(false, function (err) {
          if (err) {
            console.log("Error committing transaction");
            console.log(err);
            exitCode = 3
          }

          conn.exec("select * from " + common.tableName, function(err, result){
          result.fetchAll(function(err, data){
          assert.deepEqual(data, [ { COLINT: 42, COLDATETIME: null, COLTEXT: null } ]);
            });
           });
          finish();
        });
       });
      });
    }

    function finish() {
      common.dropTables(conn, function (err) {
        conn.disconnect(function(err){});
      });
    }
  });
  });
});
