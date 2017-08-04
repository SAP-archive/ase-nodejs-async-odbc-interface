var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function (err) {
  if (err) return console.log(err);
  console.log("connected");

  db.exec("select 1 as \"COLINT\", 'some test' as \"COLTEXT\"", function (err, data) {
   db.disconnect();
   assert.equal(err, null);
   assert.deepEqual(data, [{ COLINT: '1', COLTEXT: 'some test' }]);
  });
});
