var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function (err) {
  if (err) return console.log(err);
  console.log("connected");

  db.exec("select '☯ąčęėįšųūž☎áäàéêèóöòüßÄÖÜ€ шчябы Ⅲ ❤' as UNICODETEXT", function (err, data) {
    db.disconnect();
    console.log(data);
    assert.equal(err, null);
    assert.deepEqual(data, [{ UNICODETEXT: '☯ąčęėįšųūž☎áäàéêèóöòüßÄÖÜ€ шчябы Ⅲ ❤' }]);
 });
});
