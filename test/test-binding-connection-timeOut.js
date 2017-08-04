var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.ODBC()
  , assert = require("assert")
  , exitCode = 0
  ;

db.createConnection(function (err, conn) {
  //connectionTimeout should be 0 by default as set in C++
  assert.equal(conn.connectTimeout, 0);

  //test the setter and getter
  conn.connectTimeout = 1234;
  assert.equal(conn.connectTimeout, 1234);

  //set the time out to something small
  conn.connectTimeout = 1;
  assert.equal(conn.connectTimeout, 1);

  conn.connect(common.connectionString, function (err) {
    //TODO: it would be nice if we could somehow
    //force a timeout to occurr, but most testing is
    //done locally and it's hard to get a local server
    //to not accept a connection within one second...

    if(err) return console.log(err);
    conn.disconnect(function () {

    });
  });
});
