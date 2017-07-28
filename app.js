var express = require('express'),
    app = require('express')(),
    http = require('http').Server(app),

    // MongoClient = require('mongodb').MongoClient,
    // ObjectID = require('mongodb').ObjectID,
    // db = require('./db'),

    mongoose = require('mongoose'),

    io = require('socket.io')(http),
    pages = require('./data/pages.json'),
    posts = require('./data/posts.json'),
    bodyParser = require('body-parser'),
    // fs = require('fs'),
    // url = require('url'),
    nav = {
        pages: pages,
        posts: posts
    };
    bannerModel = require('./models/banner');

app.set('views', './views');
app.set('view engine', 'jade');
// app.use(express.frontend('frontend'));
app.use('/frontend', express.static(__dirname + '/frontend'));
app.use(bodyParser.urlencoded({ extended: true }));//для работы с POST




// app.post('/blog', function(req, res) {
//     console.log(req.body.comment);
//     res.redirect('index');
// });

app.get('/', function (req, res) {
    bannerModel.find(function (err, doc){
        // console.log(doc[0].photo);
        res.render('index', {
            title: 'API',
            nav: nav,
            banner: doc[0]
        });
        // console.log(doc);
    });

});

app.post('/insert', function(req, res, next) {
    var item = {
        subTitle: req.body.subTitle,
        title: req.body.title,
        supTitle: req.body.supTitle,
        telTitle: req.body.telTitle,
        tel: req.body.tel
    };

    var data = new bannerModel(item);
    data.save();

    res.redirect('/');
});

// app.post('/update', function(req, res, next) {
//     var id = req.body.id;
//
//     bannerModel.findById(id, function(err, doc) {
//         if (err) {
//             console.error('error, no entry found');
//         }
//         doc.subTitle = req.body.subTitle;
//         doc.title = req.body.title;
//         doc.supTitle = req.body.supTitle;
//         doc.telTitle = req.body.telTitle;
//         doc.tel = req.body.tel;
//
//         doc.save();
//     });
//     res.redirect('/');
// });



// app.get('/:page', function (req, res, next) {
//
//     var page = req.params.page;
//     if(page == 'blog'){
//         res.render('blog', {
//             nav: nav
//         });
//     }else{
//         next();
//     }
// });

// app.get('/:id', function (req, res, next) {
//     var page = req.params.id;
//
//     var result = pages.find(function (element, index) {
//         if(element.name == page){
//             res.render(element.name, {title: element.name, page: element, nav: nav});
//             return element;
//         }
//     });
//
//     if(result == undefined) next();
// });

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
mongoose.connect('mongodb://localhost:27017/welcome',function(err){
    if(err){
        return console.log(err); //если монго не запущенна, то ошибка
    }
    app.listen(4000, function () {
        console.log('API app start');
        // homeModel.find(function (err, doc){
        //     console.log(doc[1].age);
        // });
    });
});