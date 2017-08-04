# node-sapase
An asynchronous interface for Node.js for SAP Adaptive Server Enterprise using ODBC driver.

## Requirements
* Linux or Windows platform.
* SAP Adaptive Server Enterprise ODBC Driver 16.0 SP03.
* Properly configured odbc.ini.
* This Node.js driver communicates with the SAP Adaptive Server Enterprise ODBC driver, which will be installed using [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp). If the installation of the shared dynamic library were unsuccessful, it would failback to using native compilation managed by [`node-gyp`](https://github.com/nodejs/node-gyp).
* Node.js versions supported: 6.11.1 and 5.0.0

## Install
You can install an asynchronous interface for Node.js to ODBC by using one of the following two options:

### git
```bash
git clone https://github.com/SAP/ase-nodejs-async-odbc-interface
cd sapase
node-pre-gyp install --fallback-to-build
```
### npm
```bash
npm install sapase
```
## Getting Started

```javascript
var db = require('sapase')()
  , cn = process.env.ODBC_CONNECTION_STRING
  ;

db.connect(cn, function (err) {
  if (err) return console.log(err);

  db.exec('select * from user where user_id = ?', [42], function (err, data) {
    if (err) console.log(err);

    console.log(data);

    db.disconnect(function () {
      console.log('done');
    });
  });
});
```

## Configuration
For configuration of ODBC driver, please refer to [SAP Adaptive Server Enterprise ODBC driver](http://infocenter.sybase.com/help/topic/com.sybase.infocenter.dc20116.1570100/doc/pdf/aseodbc.pdf)

## Establish a database connection
The first step to establing a database connection is to create an instance of the `Database` class. You may get an instance in one of the following ways:

```javascript
require("sapase").connect(connectionString, function (err, db){
  //db is already connected now if err is false
});
```

or by using the helper function:

```javascript
var db = require("sapase")();
```

or by creating an instance with the constructor function:

```javascript
var Database = require("sapase").Database
  , db = new Database();
```

### Connecting
Open a connection to a database by calling the connect method of the Database object, and passing a connection string representing the connection parameters.


```javascript
var db = require("sapase")()
	, cn = "DRIVER=Adaptive Server Enterprise;SERVER=host;Port=port;UID=user;PWD=password;DATABASE=dbname"
	;

db.connect(cn, function (err) {
	if (err) {
		return console.log(err);
	}

	//we now have an open connection to the database
});
```

#### Disconnecting

```javascript
var db = require("sapase")()
	, cn = "DRIVER=Adaptive Server Enterprise;SERVER=host;Port=port;UID=user;PWD=password;DATABASE=dbname"
	;

db.connect(cn, function (err) {
	if (err) {
		return console.log(err);
	}

	//we now have an open connection to the database

	db.disconnect(function (err) {
		console.log("the database connection is now closed");
	});
});
```

## Direct Statement Execution
Direct statement execution is the simplest way to execute SQL statements. The only required input parameter is the SQL command to be executed. The result will be returned via callbacks. The type of returned result depends on the kind of statement.

### Query

The `exec` function is a convenient way to completely retrieve the result of a query. In this case all selected rows are fetched and returned in the callback.

```javascript
var db = require("sapase")()
	, cn = "DRIVER=Adaptive Server Enterprise;SERVER=host;Port=port;UID=user;PWD=password;DATABASE=dbname"
	;

db.connect(cn, function (err) {
	if (err) {
		return console.log(err);
	}

	//we now have an open connection to the database
	//so lets get some data
	db.exec("select top 10 * from customers", function (err, rows) {
		if (err) {
			return console.log(err);
		}

		console.log(rows);
	});
});
```

## Prepared Statement Execution
The connection returns a `statement` object which can be executed multiple times.
```javascript
var db = require("sapase")()
  , cn = "DRIVER=Adaptive Server Enterprise;SERVER=host;Port=port;UID=user;PWD=password;DATABASE=dbname"
  ;


db.connect(cn, function (err) {
  if (err)
  {
   console.log(err);
   return (1);
  }

  db.prepare("insert into hits (col1, col2) VALUES (?, ?)", function (err, stmt) {
  if (err) {
    console.log(err);
    return db.disconnect();
  }

  stmt.execute(['something', 42], function (err, result) {
    db.disconnect();
    });
  });
});
```

## Transaction Handling
__Transactions are  not automatically commited.__ Executing a statement implicitly starts a new transaction that must be explicitly committed, or rolled back.

### Commit a Transaction
```javascript
var db = require("sapase")()
  , cn = "DRIVER=Adaptive Server Enterprise;SERVER=host;Port=port;UID=user;PWD=password;DATABASE=dbname"
  ;

db.connect(cn, function (err) {
  if (err)
  {
   console.log(err);
   return (1);
  }

  db.beginTransaction(function (err)
  {
    if (err)
    {
      console.log(err);
      return db.disconnect();
    }
    db.exec("insert into hits (col1) values ('stevedave')", function (err, data){
    if (err)
    {
      console.log(err);
      return db.disconnect();
    }
    db.commitTransaction(function (err)
    {
    if (err)
	{
      console.log(err);
      return db.disconnect();
    }
    db.exec("select * from hits where col1 = 'stevedave'", function (err, data){
    if (err)
    {
       console.log(err);
       return db.disconnect();
    }
    console.log(data);
    });
    db.disconnect();
    });
   });
  });
});
```

### Rollback a Transaction
```javascript
var db = require("sapase")()
  , cn = "DRIVER=Adaptive Server Enterprise;SERVER=host;Port=port;UID=user;PWD=password;DATABASE=dbname"
  ;

db.connect(cn, function (err) {
  if (err)
  {
   console.log(err);
   return (1);
  }

  db.beginTransaction(function (err) {
    if (err)
    {
      console.log(err);
      return db.disconnect();
    }
    db.exec("insert into hits (col1) values ('stevedave1')", function (err, data){
    if (err)
    {
      console.log(err);
      return db.disconnect();
    }
    db.rollbackTransaction(function (err)
    {
    if (err) {
      console.log(err);
      return db.disconnect();
    }
    db.exec("select * from hits where col1 = 'stevedave1'", function (err, data){
    if (err)
    {
       console.log(err);
       return db.disconnect();
    }
    console.log(data);
    });
    db.disconnect();
    });
   });
  });
});
```

## Example

```javascript
var odbc = require("sapase")
	, util = require('util')
	, db = new odbc.Database()
	;

var connectionString = "DRIVER=Adaptive Server Enterprise;SERVER=host;Port=port;UID=user;PWD=password;DATABASE=dbname";

db.connect(connectionString, function(err) {
	db.exec("select * from table", function(err, rows, moreResultSets) {
		console.log(util.inspect(rows, null, 10));

		db.disconnect(function() {
			console.log("Database connection closed");
		});
	});
});
```

## Testing

Tests can be run by executing `npm test` from within the root of the sapase directory. You can also run the tests by executing `node run-tests.js` from within the `/test` directory.

By default, the tests are setup to run against the pubs2 database using datasource name (DSN) sampledsn. The `/build` directory where the ODBC driver for SAP Adaptive Server Enterprise has been installed must be included in your library path (for Linux) or system path (Windows).

## Build options

### Debugging

To display the debugging messages, add the `DEBUG` flag to the defines section of the `binding.gyp` file and then execute
`node-gyp rebuild`.

```javascript
<snip>
'defines' : [
  "DEBUG"
],
<snip>
```

## Resources
+ [SAP Adaptive Server Enterprise ODBC driver](http://infocenter.sybase.com/help/topic/com.sybase.infocenter.dc20116.1570100/doc/pdf/aseodbc.pdf)

## License
Copyright (c) 2017 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the LICENSE file (https://github.com/SAP/ase-nodejs-async-odbc-interface/LICENSE)
