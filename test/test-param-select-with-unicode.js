var common = require("./common")
  , odbc = require("sapase")
  , db = new odbc.Database()
  , assert = require("assert")
  ;

db.connect(common.connectionString, function(err) {
  db.exec("select ? as UNICODETEXT", ['ף צ ץ ק ר ש תכ ך ל מ ם נ ן ס ע פ 電电電買买買開开開東东東車车車'], function (err, data) {
  console.log(data);
  assert.equal(err, null);
  assert.deepEqual(data, [{ UNICODETEXT: 'ף צ ץ ק ר ש תכ ך ל מ ם נ ן ס ע פ 電电電買买買開开開東东東車车車' }]);
  db.disconnect(function () {
    });
  });
});
