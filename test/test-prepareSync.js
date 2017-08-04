var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function(err){

assert.equal(db.connected, true);

db.prepare("select ? as col1, ? as col2, ? as col3", function(err,stmt){

assert.equal(stmt.constructor.name, "ODBCStatement");

stmt.bind(["hello world", 1, null], function(err){
if(err) return console.log(err);

stmt.execute(function (err, result) {
  assert.equal(err, null);
  assert.equal(result.constructor.name, "ODBCResult");

  result.fetchAll(function (err, data) {
    assert.equal(err, null);

    result.close(function(err){

    db.disconnect();
    assert.deepEqual(data, [{ col1: "hello world", col2 : 1, col3 : null }]);
     });
    });
   });
  });
 });
});
