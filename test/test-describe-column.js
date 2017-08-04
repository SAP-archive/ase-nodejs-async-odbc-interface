var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString,  function (err) {
  if (err) return console.log(err);
  console.log("connected");


  common.dropTables(db, function (err) {
  if (err) console.log(err.message);

  console.log("tables dropped");

  common.createTables(db, function (err) {
    if (err) console.log(err.message);

    console.log("tables created");

    db.describe({
      database : common.databaseName,
      table : common.tableName,
      column : 'COLDATETIME'
    }, function (err, data) {
      if (err) console.log(err.message);

      console.log(data);

      db.disconnect();
      assert.ok(data.length, "No records returned when attempting to describe the column COLDATETIME");
    });
  });
});
});
