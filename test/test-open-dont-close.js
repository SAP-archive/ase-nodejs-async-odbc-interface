var common = require("./common")
    , odbc = require("sapase")
      , db = new odbc.Database();

db.connect(common.connectionString, function(err) {
        console.error('db.open callback');
        console.error('node should just sit and wait');
    console.log(err);
    //reference db here so it isn't garbage collected:

    console.log(db.connected);
});
