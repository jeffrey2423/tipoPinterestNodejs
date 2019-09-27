const express = require('express');
const path = require('path');
const multer = require('multer');
const morgan = require('morgan');
const uuid = require('uuid/v4');

//initializations
const app = express();

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

//Routes
app.use(require('./routes/index'));

//static files

//start the server

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
