var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function(err){
common.dropTableIfExists(db, function(err, data){});
db.exec("create table " + common.tableName + " (COLINT INTEGER, COLDATETIME DATETIME, COLTEXT TEXT)", function (err, result)
{
  console.log(arguments);

  try {
    //this should throw because there was no result to be had?
    result.fetchAll(function(err,data){
    console.log(err);
    console.log(data);
   });
  }
  catch (e) {
    console.log(e);
  }

  db.disconnect();
 });
});
