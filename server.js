var httpserver = require("http");
var url = require("url");
var router = require("./router");

function onRequest(request,response){
  // Doing thing in each request
  var pathname = url.parse(request.url).pathname;
  console.log("Request for "+pathname+" received.");
  router.parsing(pathname,response);
}

httpserver.createServer(onRequest).listen(8080);
console.log("Server has started!");
