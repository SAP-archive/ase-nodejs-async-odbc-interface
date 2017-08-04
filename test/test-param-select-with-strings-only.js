var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert");


db.connect(common.connectionString, function (err) {
  assert.equal(err, null);

  db.exec("select ? as TEXTCOL, ? as TEXTCOL2, ? as TEXTCOL3"
    , ["fish", "asdf", "1234"]
    , function (err, data, more) {
          assert.equal(err, null);
          assert.deepEqual(data, [{
            TEXTCOL: 'fish',
            TEXTCOL2: 'asdf',
            TEXTCOL3: '1234'
          }]);
    db.disconnect(function () {
        });
    });
});
