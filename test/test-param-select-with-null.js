var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert");


db.connect(common.connectionString, function (err) {
  assert.equal(err, null);

  db.exec("select ? as \"NULLCOL1\" "
    , [null]
    , function (err, data, more) {
        if (err) { console.error(err) }
          assert.equal(err, null);
          assert.deepEqual(data, [{
            NULLCOL1: null
          }]);
        db.disconnect(function () {
        });
    });
});
