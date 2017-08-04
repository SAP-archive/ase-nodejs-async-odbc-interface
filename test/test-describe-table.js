var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function(err) {

  assert.equal(err, null);
  common.dropTables(db, function () {
  common.createTables(db, function () {

    db.describe({
      database : common.databaseName
      , table : common.tableName
    }, function (err, data) {
      db.disconnect();
      assert.ok(data.length, "No records returned when attempting to describe the tabe " + common.tableName);
    });
  });
});
});
