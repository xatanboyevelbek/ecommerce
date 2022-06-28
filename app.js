const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const flash = require('connect-flash');

const app = express();
