const path = require('path');
const exphbs = require('express-handlebars');

const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorhandler = require('errorhandler');

const routes = require('../routes/index');

module.exports = app =>{
    //configuración
    app.set('port', process.env.PORT || 3000);
    app.set('views',path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }));
    app.set('view engine', '.hbs');

    //middelwares
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    //routes
    routes(app);

    //static files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    //404
    app.use(function (req, res) {
        if (res.status(404)) {
            res.render('404');
        }
      });

    //errorhandlers
    if  ('development' === app.get('env')) {
        app.use(errorhandler);
    }

    return app;
}