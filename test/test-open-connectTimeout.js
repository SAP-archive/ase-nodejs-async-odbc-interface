var common = require("./common")
  , odbc = require("sapase")
  , assert = require("assert");

//test setting connectTimeout via the constructor works
var db = new odbc.Database({ connectTimeout : 1 })

db.connect(common.connectionString, function(err) {
  assert.equal(db.conn.connectTimeout, 1);

  assert.equal(err, null);
  assert.equal(db.connected, true);

  db.disconnect(function () {
    assert.equal(db.connected, false);

    db.exec("select * from " + common.tableName, function (err, rs, moreResultSets) {
      assert.deepEqual(err, { message: 'Connection not open.' });
      assert.deepEqual(rs, []);
      assert.equal(moreResultSets, false);
      assert.equal(db.connected, false);
    });
  });
});
