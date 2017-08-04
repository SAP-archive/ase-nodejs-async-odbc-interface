var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function(err){
  if(err)
   return console.log(err)

assert.equal(db.connected, true);

db.prepare("select ? as col1", function (err, stmt) {
  assert.equal(err, null);
  assert.equal(stmt.constructor.name, "ODBCStatement");

  stmt.bind(["hello world"], function (err) {
    assert.equal(err, null);

    stmt.execute(function (err, result) {
      assert.equal(err, null);
      assert.equal(result.constructor.name, "ODBCResult");

      result.fetchAll(function (err, data) {
        assert.equal(err, null);
        console.log(data);

        result.close(function(err){

        db.disconnect();
        assert.deepEqual(data, [{ col1: "hello world" }]);
       });
      });
    });
  });
});
});
