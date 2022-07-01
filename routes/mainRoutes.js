const express = require('express');
const router = express.Router();
const pagesController = require('../controller/pages');

router.get('/', pagesController.index);
router.get('/contact-us', pagesController.contactus);
router.get('/about-us', pagesController.aboutus);
router.get('/services', pagesController.services);

module.exports = router;