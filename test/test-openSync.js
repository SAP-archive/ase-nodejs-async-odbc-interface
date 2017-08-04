var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert");

assert.equal(db.connected, false);

db.exec("select * from " + common.tableName, function (err, rs, moreResultSets) {
  assert.deepEqual(err, { message: 'Connection not open.' });
  assert.deepEqual(rs, []);
  assert.equal(moreResultSets, false);
  assert.equal(db.connected, false);
});

console.log("Attempting to connect to: %s", common.connectionString);

try {
  db.connect(common.connectionString, function(err){
  if(err) console.log(err);
  });
}
catch(e) {
  console.log(e);
  assert.deepEqual(e, null);
}

try {
  db.disconnect();
}
catch(e) {
  console.log(e);
  assert.deepEqual(e, null);
}
