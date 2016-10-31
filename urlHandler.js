var fs = require("fs");

function main_page(response){
  response.writeHead(500, {"Content-Type": "text/html"});
  // Get from a html file.
  // readFile => async , readFileSync => sync
  var html = fs.readFileSync('src/index.html','utf8');
  response.write(html);
  response.end();
}

function intro_page(response){
  response.writeHead(500, {"Content-Type": "text/html"});
  // Get from a html file.
  var html = fs.readFileSync('src/intro.html','utf8');
  response.write(html);
  response.end();
}

exports.main_page = main_page;
exports.intro_page = intro_page;
