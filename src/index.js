const express = require('express');
const path = require('path');
const multer = require('multer');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const {format} = require('timeago.js');

//initializations
const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});
app.use(multer({
    storage: storage
}).single('image'));

//global variables
app.use((req, res, next) =>{
    app.locals.format = format;
    next();
});

//Routes
app.use(require('./routes/index'));

//static files
//le decimos al serves que esa carpeta la usaran todos
app.use(express.static(path.join(__dirname, 'public')));

//start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
