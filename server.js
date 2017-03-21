const express = require('express');
const app = express();

const fs = require('fs');
const url = require('url');
const path = require('path');

const bodyParser = require('body-parser');
const moment = require('moment');
const jsonfs = require('jsonfile');

/* Redirect views path */
app.set('views', path.join(__dirname, 'src/views'));
const storage_data = __dirname + '/data';

/* Setting static directory */
app.use(express.static('src/css'));
app.use(express.static('src/js'));
app.use(express.static('src/lib'));
app.use(express.static('src/core'));
app.use(express.static('src/images'));
app.use(express.static('src/config'));
app.use(express.static('src/data'));

app.use(bodyParser.urlencoded({
    extended: false
}));

/* Setting view engine as EJS */
app.set('view engine', 'ejs');

const server = require('http').createServer(app);

/* Main Page & Opening Page */
app.get('/', function(request, response) {
    // Main Page
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');

    // Fetch link support
    var link_supp = jsonfs.readFileSync(__dirname + '/src/config/link.json');

    // Opening Page
    response.render('opening', {
        title: 'NCKU-SU',
        link: link_supp
    });

    // Main Page
    /*response.render('index', {
        title: 'NCKU-SU',
        link: link_supp
    });*/
});

/* About Page */
app.get('/about', function(request, response) {
    // Read message from exists file
    console.log(storage_data + '/about/about.json');

    // Fetch about message
    var about_msg = jsonfs.readFileSync(storage_data + '/about/about.json');

    // About Page render
    response.render('about', {
        title: 'About ESIT',
        content: about_msg
    });
});

/* Department Intro Page */
app.get('/department', function(request, response) {
    // Department Intro Page render
    response.render('department-3d', {
        title: 'Department Intro'
    });
});

/* Activity Page */
app.get('/activity', function(request, response) {
    // Activity Page render 
    response.render('activity', {
        title: 'Actibity'
    });
});

/* Listen URL request */
server.listen(process.env.npm_package_config_port, function() {
    var host = server.address().address;
    var port = server.address().port;
    // logger.record('io.render',"[io.render] Example app listening at "+host+" : "+port);
    console.log("[NCKUSU Website Start] Open Web service at [" + host + " : " + port + "] , time: " + moment().format());
});
