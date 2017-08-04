var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function (err) {
  if (err) return console.log(err);
  console.log("connected");
  common.createTables(db, function (err, data, morefollowing) {
    console.log(arguments);
    db.disconnect();
  });
});
