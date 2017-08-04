var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function(err){
if(err) return console.log(err);
issueQuery(100001);
issueQuery(3000);
issueQuery(4000);
issueQuery(5000);
issueQuery(8000);
finish(0);

function issueQuery(length) {
  var count = 0
    , time = new Date().getTime()
    , stmt
    , result
    , data
    , str = ''
    ;

  var set = 'abcdefghijklmnopqrstuvwxyz';

  for (var x = 0; x < length; x++) {
    str += set[x % set.length];
  }

  assert.doesNotThrow(function () {
    db.prepare('select ? as longString',  function(err, stmt) {
    if(err) return console.log(err);

    assert.doesNotThrow(function () {
    stmt.bind([str]);

    assert.doesNotThrow(function () {
    stmt.execute(function(err, stmt){
      if(err) return console.log(err);

    assert.doesNotThrow(function () {
    result.fetchAll(function(err, data){
      if(err) return console.log(err);
      console.log('expected length: %s, returned length: %s', str.length, data[0].longString.length);

      for (var x = 0; x < str.length; x++) {
      if (str[x] != data[0].longString[x]) {
      console.log(x, str[x], data[0].longString[x]);

      assert.equal(str[x], data[0].longString[x]);
      }
     }
      assert.equal(data[0].longString, str);

        });
       });
      });
     });
    });
   });
  });

}

function finish(exitCode) {
  db.disconnect();

  console.log("connection closed");
  process.exit(exitCode || 0);
}
});
