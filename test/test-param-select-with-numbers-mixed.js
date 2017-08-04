var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert");


db.connect(common.connectionString, function (err) {
  assert.equal(err, null);

  db.exec("select ? as TEXTCOL, ? as TEXTCOL2, ? as INTCOL "
    , ["fish", "asdf", 1]
    , function (err, data, more) {
          assert.deepEqual(data, [{
            TEXTCOL: 'fish',
            TEXTCOL2: 'asdf',
            INTCOL: 1
          }]);
    db.disconnect(function () {
          assert.equal(err, null);
        });
    });
});
