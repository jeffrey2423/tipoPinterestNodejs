const { Router } = require('express');
const router = Router();
const Image = require('../models/image');
const path = require('path');
const {unlink} = require('fs-extra');


router.get('/', async (req, res) =>{
   const images = await Image.find();
   //rendeizamos las vistas y le pasamos el arreglo 
   //con las imagenes desde mongodb
   res.render('index', {images});
});

router.get('/upload', (req, res) =>{
    res.render('upload')
});

router.post('/upload', async (req, res) =>{
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    
    await image.save();

    res.redirect('/');
});

router.get('/image/:id', async (req, res) =>{
    const {id} = req.params;
    const image = await Image.findById(id);
    res.render('profile', {image});
});

router.get('/image/:id/delete', async (req, res) =>{
    const {id} = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.redirect('/');
});


module.exports = router;