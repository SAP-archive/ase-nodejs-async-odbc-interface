![](https://img.shields.io/badge/STATUS-NOT%20CURRENTLY%20MAINTAINED-red.svg?longCache=true&style=flat)

# Important Notice
This public repository is read-only and no longer maintained.

# node-sapase
An asynchronous interface for Node.js to connect to SAP Adaptive Server Enterprise using ODBC driver.

## Requirements
* Linux or Windows platform.
* SAP Adaptive Server Enterprise ODBC Driver 16.0 SP03.
* Properly configured odbc.ini.
* The Node.js driver which communicates with SAP Adaptive Server Enterprise ODBC driver is installed with [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp). If the installation of the shared dynamic library failed, it will use the native compilation managed by [`node-gyp`](https://github.com/nodejs/node-gyp).
* Node.js 6.11.1 or 5.5.0.

## Install
```
npm install sapase
```
## Getting Started
Running the following example allows you to quickly start using the Node.js driver:

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
For configuration of the ODBC driver, refer to [SAP Adaptive Server Enterprise ODBC driver](http://infocenter.sybase.com/help/topic/com.sybase.infocenter.dc20116.1570100/doc/pdf/aseodbc.pdf)

## Establish a Database Connection
To establish a database connection, create an instance of the `Database` class then open a connection to a database.

### Create Instances
There are various methods to create instances for the `Database` class:

Create an instance directly:

```javascript
require("sapase").connect(connectionString, function (err, db){
  //db is already connected now if err is false
});
```

Creating an instance by using the helper function:

```javascript
var db = require("sapase")();
```

Creating an instance with the constructor function:

```javascript
var Database = require("sapase").Database
  , db = new Database();
```

### Connect
Open a connection to a database by calling the connect method of the `Database` object, and passing a connection string representing the connection parameters.


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

### Disconnect
Close the connection from Node.js to the connected database in SAP Adaptive Server Enterprise by using the `disconnect` function.

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
Direct statement execution is the simplest way to execute SQL statements. The only required input parameter is the SQL command to be executed. The result is returned using callbacks. The type of returned result depends on the kind of statement.

### Execute Query

The `exec` function is a convenient way to retrieve the full result of a query. In this case, all selected rows are fetched and returned in the callback.

```javascript
var db = require("sapase")()
	, cn = "DRIVER=Adaptive Server Enterprise;SERVER=host;Port=port;UID=user;PWD=password;DATABASE=dbname"
	;

db.connect(cn, function (err) {
	if (err) {
		return console.log(err);
	}

	//we now have an open connection to the database
	//let's get some data
	db.exec("select top 10 * from customers", function (err, rows) {
		if (err) {
			return console.log(err);
		}

		console.log(rows);
	});
});
```

## Prepared Statement Execution
The process of executing a prepared statement requires you to first prepare the statement, before executing it. When preparing a statement, the connection returns a `statement` object which can be executed multiple times. The execution of a prepared statement is similar to that of direct statement execution.
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
You can begin, commit, and rollback a transaction in the SAP Adaptive Server Enterprise database using Node.js via the Node.js driver. __Transactions are  not automatically committed.__ Executing a statement starts a new transaction that must be explicitly committed, or rolled back.

### Begin and Commit a Transaction
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

You can run the tests by executing `npm test` from within the root of the `sapase` directory or by executing `node run-tests.js` from within the `/test` directory.

By default, the tests are setup to run against the pubs2 database using datasource name (DSN) sampledsn. The `/build` directory where the ODBC driver for SAP Adaptive Server Enterprise is installed must be included in your library path (for Linux) or system path (Windows).

## Build Options

### Debugging

To display debugging messages, add the `DEBUG` flag to the defines section of the `binding.gyp` file, then execute
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

## How to Obtain Support
Get support for SAP products

This software is provided AS-IS, and no additional free support is provided.

Alternatively, if your organization has purchased a support contract for SAP Adaptive Server Enterprise for which this product is used with, then one or more of your colleagues is designated as an authorized support contact. If you have any questions, or if you need assistance, ask a designated person to contact SAP Support as specified in your contract.

## Attribution
This software is modified from open source node-odbc module https://www.npmjs.com/package/odbc

## License
Copyright (c) 2017 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [`LICENSE`](https://github.com/SAP/ase-nodejs-async-odbc-interface/blob/master/LICENSE) file
