var common = require("./common")
  , odbc = require("../")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

var count = 0;
var iterations = 10;

db.connect(common.connectionString, function(err){
if(err) return console.log(err);
  
common.dropTableIfExists(db, function () {
  common.createTables(db, function (err, data) {
    if (err) {
      console.log(err);
      
      return finish(2);
    }
    
    db.prepare("insert into " + common.tableName + " (COLINT, COLTEXT) VALUES (?, ?)", function(err, stmt){
    assert.equal(stmt.constructor.name, "ODBCStatement");
    
    recursive(stmt);
  }); 
 });
});

function finish(retValue) {
  console.log("finish exit value: %s", retValue);
  
  db.disconnect();
}

function recursive (stmt) {
  try {
    stmt.bind([4, 'hello world'], function(err){
    if(err) return console.log(err);
  
  stmt.execute(function (err, result) {
    if (err) {
      console.log(err.message);
      
      return finish(4);
    }
    
    result.close(function(err){
    });
    count += 1;
    console.log(count);    
    console.log("count %s, iterations %s", count, iterations);
    
    if (count <= iterations) {
      console.log("if");
        recursive(stmt);
    }
    else {
      console.log("else");
      db.exec("select * from " + common.tableName, function(err, data){
      if(err)
      {
        console.log(err.message);
        return finish(5); 
      }
      console.log(data); 
      });
      
      common.dropTables(db, function () {
        return finish(0);
      });
    };
  });
 });
 }
  catch (e) {
    console.log(e.message);
    finish(3);
  }
 }
});
