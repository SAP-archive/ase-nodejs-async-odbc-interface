var common = require("./common")
  , odbc = require("sapase")
  , assert = require("assert");

odbc.connect(common.connectionString, function (err, conn) {
  if (err) {
    console.log(err);
  }
  assert.equal(err, null);
  assert.equal(conn.constructor.name, 'Database');

  conn.disconnect();
});

