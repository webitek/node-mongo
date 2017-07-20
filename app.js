var express = require('express'),
    app = require('express')(),
    http = require('http').Server(app),

    // MongoClient = require('mongodb').MongoClient,
    // ObjectID = require('mongodb').ObjectID,
    db = require('./db'),
    //artistsController = require('./controllers/artists'),

    mongoose = require('mongoose'),
    //Schema = mongoose.Schema,

    io = require('socket.io')(http),
    pages = require('./data/pages.json'),
    posts = require('./data/posts.json'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    url = require('url'),
    nav = {
        pages: pages,
        posts: posts
    },
    pageSchema = require('./models/artists');

app.set('views', './views/');
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));//для работы с POST



// app.get('/', artistsController.all);
app.get('/', function (req, res) {

    pageSchema.find(function(err, elem) {
        console.log(elem); // { name: 'Sam' }
    });

    res.render('index', {
        title: 'API',
        nav: nav
    });

});

app.get('/:page', function (req, res, next) {

    var page = req.params.page;
    if(page == 'blog'){
        res.render('blog', {
            nav: nav
        });
    }else{
        next();
    }
});

/*app.get('/:id', function (req, res, next) {
    var page = req.params.id;

    var result = pages.find(function (element, index) {
        if(element.name == page){
            res.render(element.name, {title: element.name, page: element, nav: nav});
            return element;
        }
    });

    if(result == undefined) next();
});*/

/*app.get('/blog/:post', function (req, res, next) {

    var post = req.params.post,
        result = posts.find(function (element, index) {
            if(element.link == post){
                res.render('post', {post: element, nav: nav});
                return element;
            }
        });

    if(result == undefined) next()

});*/

app.use(function(req, res) {
    res.status(404).render('error', {title: '404', nav: nav});
});

app.use(function(req, res) {
    res.status(500).render('error', {title: '500', nav: nav});
});

// http.listen(3001, function(){
//     console.log('Listen 3001 port');
// });
mongoose.connect('mongodb://localhost:27017/myapi',function(err){
    if(err){
        return console.log(err); //если монго не запущенна, то ошибка
    }
    app.listen(3001, function () {
        console.log('API app start');
    });
});