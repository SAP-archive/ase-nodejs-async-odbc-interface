var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert");


db.connect(common.connectionString, function (err) {
  assert.equal(err, null);
  db.exec("select ? as \"TRUECOL\", ? as \"FALSECOL\" "
    , [true, false], function (err, data, more) {
          assert.equal(err, null);
          assert.deepEqual(data, [{
            TRUECOL: true,
            FALSECOL: false
          }]);
        db.disconnect(function (){
        });
    });
});
