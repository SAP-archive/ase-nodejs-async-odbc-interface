var domain = require("domain");

var d = domain.create();

d.on("error", function (error) {
  console.log("Error caught!", error);
});

d.run(function() {
   var db = require("sapase");

   console.trace();

   db.disconnect("wrongConnectionString", function (error) {
      console.trace();
      throw new Error();
    });
});
