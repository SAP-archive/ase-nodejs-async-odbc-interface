var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

assert.equal(db.connected, false);

db.exec("select * from test", function (err, rs, moreResultSets) {
  assert.deepEqual(err, { message: 'Connection not open.' });
  assert.deepEqual(rs, []);
  assert.equal(moreResultSets, false);
  assert.equal(db.connected, false);
  console.log(err);
});
