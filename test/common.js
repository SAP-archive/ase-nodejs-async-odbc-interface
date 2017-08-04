var odbc = require("sapase");
//odbc.library = '/usr/lib/odbc/libsqlite3odbc-0.91';
//odbc.library = '/usr/lib/x86_64-linux-gnu/odbc/libtdsodbc';
//odbc.library = '/opt/sqlncli-11.0.1790.0/lib64/libsqlncli-11.0';

exports.connectionString = 'DSN=sampledsn;';
exports.title = "ODBC";
exports.dialect = "ODBC";

if (process.argv.length === 3) {
  exports.connectionString = process.argv[2];
}

exports.connectionObject = {
        DSN : "sampledsn"
};

try {
  exports.testConnectionStrings = require('./config.testConnectionStrings.json');
}
catch (e) {
  exports.testConnectionStrings = [{ title : exports.title, connectionString : exports.connectionString, dialect : exports.dialect }];
}

try {
  exports.benchConnectionStrings = require('./config.benchConnectionStrings.json');
}
catch (e) {
  exports.benchConnectionStrings = [{ title : exports.title, connectionString : exports.connectionString, dialect : exports.dialect }];
}

if (process.argv.length === 3) {
  //look through the testConnectionStrings to see if there is a title that matches
  //what was requested.
  var lookup = process.argv[2];

  exports.testConnectionStrings.forEach(function (connectionString) {
    if (connectionString && (connectionString.title == lookup || connectionString.connectionString == lookup)) {
      exports.connectionString = connectionString.connectionString;
      exports.dialect = connectionString.dialect;
    }
  });
}

exports.databaseName = "pubs2";
exports.tableName = "NODE_ODBC_TEST_TABLE";

exports.dropTableIfExists = function (db, cb) {
  db.exec("if exists (select * from sysobjects where name = '"+ exports.tableName + "') drop table " +  exports.tableName, cb);
};

exports.dropTables = function (db, cb) {
  db.exec("drop table " + exports.tableName, cb);
};

exports.createTables = function (db, cb) {
  db.exec("create table " + exports.tableName + " (COLINT INTEGER NULL, COLDATETIME DATETIME NULL, COLTEXT TEXT NULL)", cb);
};
