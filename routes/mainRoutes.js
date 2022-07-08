const express = require('express');
const router = express.Router();
const pagesController = require('../controller/pages');
const authController = require('../controller/auth');

router.get('/', pagesController.index);
router.get('/contact-us', pagesController.contactus);
router.get('/about-us', pagesController.aboutus);
router.get('/services', pagesController.services);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewpassword);
router.post('/new_password', authController.postNewpassword);

module.exports = router;