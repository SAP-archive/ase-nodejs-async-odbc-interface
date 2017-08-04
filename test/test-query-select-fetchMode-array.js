var common = require("./common")
  , odbc = require("sapase")
  , db = odbc({ fetchMode : odbc.FETCH_ARRAY })
  , assert = require("assert")
  ;

db.connect(common.connectionString,  function (err){
  assert.equal(db.connected, true);

  db.exec("select 1 as COLINT, 'some test' as COLTEXT ", function (err, data) {
    assert.equal(err, null);
    db.disconnect();
    assert.deepEqual(data, [[1,"some test"]]);
  });
});
