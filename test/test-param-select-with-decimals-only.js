var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert");


db.connect(common.connectionString, function (err) {
  assert.equal(err, null);

  db.exec("select ? as \"DECCOL1\" "
    , [5.5]
    , function (err, data, more) {
          assert.equal(err, null);
          assert.deepEqual(data, [{
            DECCOL1: 5.5
          }]);
    db.disconnect(function () {
        });
    });
});
