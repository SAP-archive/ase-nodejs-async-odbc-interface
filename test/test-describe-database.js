var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function(err){
assert.equal(err, null);
console.log(common.databaseName);
common.dropTables(db, function () {
  common.createTables(db, function () {
    db.describe({
      database : common.databaseName
    }, function (err, data) {
      console.log(data.length);
      db.disconnect();
      assert.ok(data.length, "No records returned when attempting to describe the database");
    });
  });
 });
});
