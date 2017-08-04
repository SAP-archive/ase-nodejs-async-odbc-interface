var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function (err) {
  assert.equal(db.connected, true);

  db.execResult("select 1 as COLINT, 'some test' as COLTEXT ", function (err, result) {
     assert.equal(err, null);
     assert.equal(result.constructor.name, "ODBCResult");

     result.fetch(function (err, data) {
       db.disconnect();
       assert.deepEqual(data, { COLINT: '1', COLTEXT: 'some test' });
     });
  });
});
