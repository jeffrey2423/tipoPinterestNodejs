const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/copia_pinterest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err));