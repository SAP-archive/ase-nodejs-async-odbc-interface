var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function(err){
if(err) return console.log(err);
issueQuery();

function issueQuery() {
  var count = 0
    , time = new Date().getTime()
    ;

  assert.doesNotThrow(function () {
    db.prepare('select cast(? as datetime) as test', function(err, stmt) {
    if(err) return console.log(err);

    assert.throws(function () {
    stmt.execute(function(err, result) {
    if(err) return console.log(err);

    assert.doesNotThrow(function () {
    stmt.bind([0],function(err){
    if(err) return console.log(err);

    assert.doesNotThrow(function () {
    stmt.execute(function(err, result) {
    if(err) return console.log(err);

    assert.doesNotThrow(function () {
    result.fetchAll(function(err, data){
    if(err) return console.log(err);
    assert.ok(data);
    console.log(data);
          });
         });
        });
       });
      });
     });
    });
   });
  });
 });
 finish(0);
}

function finish(exitCode) {
  db.disconnect();

  console.log("connection closed");

  process.exit(exitCode || 0);
}
});
