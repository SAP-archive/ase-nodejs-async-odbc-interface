var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.ODBC()
  , assert = require("assert")
  , exitCode = 0
  ;

/*
 *  * The purpose of this test is to test binding an array and then
 *   * changing the values of the array before an execute[Sync]
 *    * call and have the new array values be used.
 *     */

db.createConnection(function (err, conn) {
  conn.connect(common.connectionString, function(err) {

  conn.createStatement(function (err, stmt) {
    var r, caughtError;

    var a = ['hello', 'world'];

    stmt.prepare('select ? as col1, ? as col2', function(err) {
    if(err) console.log(err);

    stmt.bind(a, function(err){
    if(err) console.log(err);
    stmt.execute(function(err, result) {
    if(err) console.log(err);
    result.fetchAll(function(err, data){
    if(err) console.log(err);
    console.log(data);
    result.close(function(err){
    a = ['goodbye', 'steven'];
    stmt.bind(a, function(err){
    stmt.execute(function(err, result) {
    result.fetchAll(function(err, data){
    console.log(data);
        assert.deepEqual(data, [ { col1: 'goodbye', col2: 'steven' } ]);
        conn.disconnect(function(err){});
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
});

