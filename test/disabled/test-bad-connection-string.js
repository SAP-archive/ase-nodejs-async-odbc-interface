var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;


db.connect("this is wrong", function (err) {
  });

assert.equal(db.connected, false);

db.connect("this is wrong", function(err) {
  assert.deepEqual(err, {
  errors :
       [{ message: '[SAP][ASE ODBC Driver]Invalid port number',
          state: '01S00' } ],
          error: '[node-odbc] SQL_ERROR',
       message: '[SAP][ASE ODBC Driver]Invalid port number',
       state: '01S00',
  });
  assert.equal(db.connected, false);
});
