var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  , exitCode = 0
  ;


db.connect(common.connectionString, function(err){
common.dropTableIfExists(db, function (err, data) {
});
common.createTables(db, function (err, data) {
  try {
    db.beginTransaction(function(err){
    if (err) {
        console.log("Error beginning transaction");
        console.log(err);
        exitCode = 3
      }
    db.exec("insert into " + common.tableName + " (COLINT, COLDATETIME, COLTEXT) VALUES (42, null, null)", function(err, result){
    if (err) {
        console.log("Error query transaction");
        console.log(err);
        exitCode = 4
      }
    db.rollbackTransaction(function(err){
    if (err) {
        console.log("Error rolling transaction");
        console.log(err);
        exitCode = 5
      }

    db.exec("select * from " + common.tableName, function(err, result){
    assert.deepEqual(result, []);
     test2();
      });
     });
    });
   });
  }
  catch (e) {
    console.log("Failed when rolling back");
    console.log(e);
    exitCode = 1
  }
  function test2()
  {
  try {

    db.beginTransaction(function(err){
    if (err) {
        console.log("Error beginning transaction");
        console.log(err);
        exitCode = 3
      }
    db.exec("insert into " + common.tableName + " (COLINT, COLDATETIME, COLTEXT) VALUES (42, null, null)", function(err, result){
    if (err) {
        console.log("Error query transaction");
        console.log(err);
        exitCode = 4
      }
    db.commitTransaction(function(err){
    if (err) {
        console.log("Error rolling transaction");
        console.log(err);
        exitCode = 5
      }

    db.exec("select * from " + common.tableName, function(err, result){
    finish();
    assert.deepEqual(result, [ { COLINT: 42, COLDATETIME: null, COLTEXT: null } ]);
      });
     });
    });
   });
  }
  catch (e) {
    console.log("Failed when committing");
    console.log(e);

    exitCode = 2;
  }
  function finish()
  {
      common.dropTables(db, function (err) {
        db.disconnect();
        process.exit(exitCode);
      });
  }
  }
 });
});
