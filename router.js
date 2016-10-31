var handler = require("./urlHandler");

handler["/"] = handler.main_page;
handler["/intro"] = handler.intro_page;

function parsing(pathname,response){
  if(typeof handler[pathname] === 'function'){
    handler[pathname](response);
  }
  else{
    // Not match request
    response.writeHead(200,{"Content-Type": "text/plain"});
    response.write("404 Error Not Found");
    response.end();
  }
}

exports.parsing = parsing;
