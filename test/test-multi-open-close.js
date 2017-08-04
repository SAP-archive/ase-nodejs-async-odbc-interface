var common = require("./common")
    , odbc = require("sapase")
    , openCallback = 0
    , closeCallback = 0
    , openCount = 50
    , connections = []
    ;

for (var x = 0; x < openCount; x++ ) {
    (function () {
        var db = new odbc.Database();
        connections.push(db);

        db.connect(common.connectionString, function(err) {
            if (err) {
                throw err;
                process.exit(1);
            }

            openCallback += 1;

            maybeClose();
        });
    })();
}

function maybeClose() {

    if (openCount == openCallback) {
        doClose();
    }
}


function doClose() {
    connections.forEach(function (db) {
        db.disconnect(function () {
            closeCallback += 1;

            maybeFinish();
        });
    });
}

function maybeFinish() {
    if (openCount == closeCallback) {
        console.log('Done');
    }
}
