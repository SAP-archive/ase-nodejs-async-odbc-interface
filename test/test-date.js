var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function(err) {
  assert.equal(err, null);
  assert.equal(db.connected, true);
  var tzoffset = (new Date()).getTimezoneOffset() * 60000;
  var dt = new Date();
  var lc = (new Date(dt - tzoffset)).toISOString().slice(0,-1);
  var sql = "SELECT cast('" + lc + "' as datetime) as DT1";

  console.log(sql);

  db.exec(sql, function (err, data) {
   assert.equal(err, null);
    assert.equal(data.length, 1);

    db.disconnect(function () {
      assert.equal(db.connected, false);
      console.log(dt.toISOString());
      console.log(data);

      //test selected data after the connection
      assert.equal(data[0].DT1.constructor.name, "Date", "DT1 is not an instance of a Date object");
      assert.equal(data[0].DT1.getDate(), dt.getDate());
    });
  });
});
