const express = require('express');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const mongodbSession = require('connect-mongodb-session')(session);
const multer = require('multer');
const app = express();
const MONGODB_URI = 'mongodb+srv://elbekkhatanboyev:27092001Elbek@cluster0.ch1k2.mongodb.net/ecommerce?retryWrites=true&w=majority';
const mainRoutes = require('./routes/mainRoutes');
const shopRoutes = require('./routes/shopRoutes');
const User = require('./model/user');

const store = new mongodbSession({
    uri: MONGODB_URI,
    collection: 'session'
})

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'user_files')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('file'));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: true, store: store}));
app.use(csrf());
app.use(flash());

app.use((req, res, next) => {
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id).then(user => {
        req.user = user;
        next();
    }).catch((err) => {
        console.log(err);
    })
});

app.use((req, res, next) => {
    res.locals.isAutenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    res.locals.errorMessage = req.flash('error');
    next();
})

app.use(mainRoutes);
app.use(shopRoutes);

mongoose.connect(MONGODB_URI).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});