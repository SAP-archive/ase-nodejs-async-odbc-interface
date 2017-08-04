var common = require("./common")
  , odbc = require("sapase")
  , assert = require("assert")
  , db = new odbc.Database()
  , iterations = 50
  ;

db.connect(common.connectionString, function(err) {
if(err) console.log(err);

issueQuery3(function () {
  finish();
});

function issueQuery3(done) {
  var count = 0
    , time = new Date().getTime();


  for (var x = 0; x < iterations; x++) {
    (function (x) {
      db.prepare('select ? as test', function(err, stmt){
      stmt.bind([x], function(err){
      stmt.execute(function(err, result){
      result.fetchAll(function(err, data){
      assert.deepEqual(data, [ { test : x } ]);
      result.close(function(err){
       if (++count == iterations) {
        var elapsed = new Date().getTime() - time;
       console.log("%d queries issued in %d seconds, %d/sec : Prepare - Bind - Execute - Close", count, elapsed/1000, Math.floor(count/(elapsed/1000)));
       return done();
       }
       stmt.close();
             });
        });
       });
      });
     });
    })(x);
  }
}

function finish() {
  db.disconnect();
  console.log("connection closed");
}
});
