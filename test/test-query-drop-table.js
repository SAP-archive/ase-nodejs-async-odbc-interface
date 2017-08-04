var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function (err) {
  if (err) return console.log(err);
  console.log("connected");

  common.dropTableIfExists(db, function (err, data) {
    db.disconnect();
    assert.equal(err, null);
    assert.deepEqual(data, []);
  });
});
