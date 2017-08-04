var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function(err){
if(err) return console.log(err);

assert.equal(db.connected, true);

  db.exec("select invalid query",function(err, data){

  db.disconnect();
  console.log("\nError:"+err);
  assert.equal(err.error, "[node-odbc] SQL_ERROR");
 });
});
