var common = require("./common")
  , odbc = require("../")
  , db = new odbc.Database()
  , assert = require("assert")
  , exitCode = 0
  ;


db.connect(common.connectionString, function(err) {
   if(err)
   {
     return console.log(err);
   }
common.dropTableIfExists(db, function (err, data) {
  if(err)
   {
     return console.log(err);
   }
});
common.createTables(db, function (err, data) {
  test1()

  function test1() {
    db.beginTransaction(function (err) {
      if (err) {
        console.log("Error beginning transaction.");
        console.log(err);
        exitCode = 1
      }

      db.exec("insert into " + common.tableName + " (COLINT, COLDATETIME, COLTEXT) VALUES (42, null, null)", function(err, data)
      {
         if(err)
           return console.log(err);

      //rollback
      db.endTransaction(true, function (err) {
        if (err) {
          console.log("Error rolling back transaction");
          console.log(err);
          exitCode = 2
        }

        db.exec("select * from " + common.tableName, function(err, data)
        {
           if(err)
             return console.log(err);
           assert.deepEqual(data, []);
       });
       test2();
      });
     });
    });
  }

  function test2 () {
    //Start a new transaction
    db.beginTransaction(function (err) {
      if (err) {
        console.log("Error beginning transaction");
        console.log(err);
        exitCode = 3
      }

      db.exec("insert into " + common.tableName + " (COLINT, COLDATETIME, COLTEXT) VALUES (42, null, null)" , function(err, data)
      {
        if(err)
          return console.log(err);
      });

      //commit
      db.endTransaction(false, function (err) {
        if (err) {
          console.log("Error committing transaction");
          console.log(err);
          exitCode = 3
        }
        });
        db.exec("select * from " + common.tableName, function(err, data)
        {
           if(err)
             return console.log(err);
           assert.deepEqual(data, [ { COLINT: 42, COLDATETIME: null, COLTEXT: null } ]);
        });


        finish();

    });
  }

  function finish() {
    common.dropTables(db, function (err) {
      db.disconnect();
      process.exit(exitCode);
    });
  }
});

});
