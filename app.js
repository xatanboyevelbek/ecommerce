const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const flash = require('connect-flash');
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname + '/public')));