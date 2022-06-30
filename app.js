const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const flash = require('connect-flash');
const ejs = require('ejs');
const session = require('express-session');
const mongoose = require('mongoose');
const mongodbSession = require('connect-mongodb-session')(session);
const app = express();
const MONGODB_URI = 'mongodb+srv://elbekkhatanboyev:27092001Elbek@cluster0.ch1k2.mongodb.net/ecommerce?retryWrites=true&w=majority';

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({extended: true}));

// app.use(csrf());
// app.use(flash());



mongoose.connect(MONGODB_URI).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});