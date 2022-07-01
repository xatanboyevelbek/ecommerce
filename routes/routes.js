const express = require('express');
const router = express.Router();
const pagesController = require('../controller/pages');

router.get('/', pagesController.index);

module.exports = router;