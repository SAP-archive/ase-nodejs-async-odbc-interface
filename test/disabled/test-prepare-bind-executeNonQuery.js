var common = require("./common")
  , odbc = require("sapase")
  , assert = require("assert")
  , db = new odbc.Database()
  , iterations = 1000
  ;

db.connect(common.connectionString, function(err){
  if (err) {
    console.error(err);
    process.exit(1);
  }

  issueQuery2(function () {
    finish();
  });
});

function issueQuery2(done) {
  var count = 0
    , time = new Date().getTime();

  for (var x = 0; x < iterations; x++) {
    (function (x) {
      db.prepare('select ? as test', function(err, stmt){
      stmt.bind([x], function (err) {
        if (err) {
          console.log(err);
          return finish();
        }
        stmt.executeNonQuery(function (err, result) {
          cb(err, result, x);
      stmt.close();
        });
      });
     });
    })(x);
  }

  function cb (err, data, x) {
    if (err) {
      console.error(err);
      return finish();
    }

    if (++count == iterations) {
      var elapsed = new Date().getTime() - time;
      console.log("%d queries issued in %d seconds, %d/sec : Prepare - Bind - ExecuteNonQuery ", count, elapsed/1000, Math.floor(count/(elapsed/1000)));
      return done();
    }
  }
}

function finish() {
  db.disconnect(function () {
    console.log("connection closed");
  });
}

