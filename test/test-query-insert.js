var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  , insertCount = 0;
  ;

db.connect(common.connectionString, function(err) {
  common.dropTables(db, function () {
    common.createTables(db, function (err) {

      console.log(err);
      assert.equal(err, null);

      db.exec("insert into " + common.tableName + " (COLTEXT) values ('sandwich')", insertCallback);
      db.exec("insert into " + common.tableName + " (COLTEXT) values ('fish')", insertCallback);
      db.exec("insert into " + common.tableName + " (COLTEXT) values ('scarf')", insertCallback);

    });
  });
});

function insertCallback(err, data) {
  assert.equal(err, null);
  assert.deepEqual(data, []);

  insertCount += 1;

  if (insertCount === 3) {
    common.dropTables(db, function () {
      db.disconnect(function () {
        console.error("Done");
      });
    });
  }
}
