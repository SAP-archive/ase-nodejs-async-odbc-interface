var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString,function(err){
assert.equal(db.connected, true);

db.prepare("asdf asdf asdf asdf sadf ", function(err,stmt){
assert.equal(stmt.constructor.name, "ODBCStatement");

stmt.bind(["hello world", 1, null], function(err){
  if(err) return console.log(err); });

stmt.execute(function (err, result) {
  assert.ok(err);
  stmt.executeNonQuery(function (err, count) {
    assert.ok(err);
    db.disconnect();
   });
  });
 });
});
