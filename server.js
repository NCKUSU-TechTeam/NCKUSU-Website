const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const bodyParser = require('body-parser');
const jsfs = require('jsonfile');
/* Redirect views path */
app.set('views',path.join(__dirname,'src/views'));
const storage_data = __dirname+'/data';
/* Setting static directory - resources */
app.use(express.static('src/lib'));
app.use(express.static('src/core'));
app.use(express.static('src/js'));
app.use(express.static('src/images'));
app.use(express.static('src/css'));
app.use(express.static('src/data'));
app.use(bodyParser.urlencoded({extended: false}));
/* Setting view engine as ejs */
app.set('view engine','ejs');
const server = require('http').createServer(app);
var url = require("url");

// URL maker
app.get('/',function(request,response){
    // Main Page
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + " received.");
    response.render('index',{
        title: 'NCKU-su'
    });
});

app.get('/activity',function(request,response){
    // Activity Page
    response.end("activity");
});

app.get('/department',function(request,response){
    // Department Intro page
    response.render('department-3d',{
        title: 'Department Intro'
    });
});

app.get('/about',function(request,response){
    // About tech team
    /* Read message from exists file */
    console.log(storage_data+'/about/about.json');
    var about_msg = jsfs.readFileSync(storage_data+'/about/about.json');
    response.render('about',{
        title: 'About ESIT',
        content: about_msg
    });
});

// Listen url request
server.listen(process.env.npm_package_config_port, function(){
    var host = server.address().address;
    var port = server.address().port;
    // logger.record('io.render',"[io.render] Example app listening at "+host+" : "+port);
    console.log("[Ncku Website start] Open Web service at ["+host+" : "+port+"] , time: " + moment().format());
});
