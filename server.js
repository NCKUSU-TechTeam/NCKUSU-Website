const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const bodyParser = require('body-parser');
/* Redirect views path */
app.set('views',path.join(__dirname,'src/views'));
/* Setting static directory - image use */
app.use(express.static('src/lib'));
app.use(express.static('src/core'));
app.use(express.static('src/images'));
app.use(bodyParser.urlencoded({extended: false}));
/* Setting view engine as ejs */
app.set('view engine','ejs');
const server = require('http').createServer(app);
var url = require("url");

// URL maker
app.get('/',function(request,response){
    // get all path
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + " received.");
    response.render('index',{
        title: 'NCKU-su'
    });
});

app.get('/activity',function(request,response){
    response.end("activity");
});

app.get('/department',function(request,response){
    response.render('department-3d',{
        title: 'Department Intro'
    });
});

app.get('/about',function(request,response){
    response.end('about')
});

// Listen url request
server.listen(process.env.npm_package_config_port, function(){
    var host = server.address().address;
    var port = server.address().port;
    // logger.record('io.render',"[io.render] Example app listening at "+host+" : "+port);
    console.log("[Ncku Website start] Open Web service at ["+host+" : "+port+"] , time: " + moment().format());
});
