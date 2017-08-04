var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionObject, function(err){
  assert.equal(err, null);

  db.disconnect(function () {
    assert.equal(db.connected, false);
  });
});
