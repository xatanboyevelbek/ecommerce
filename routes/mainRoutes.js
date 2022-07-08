const express = require('express');
const {check, body} = require('express-validator');
const router = express.Router();
const pagesController = require('../controller/pages');
const authController = require('../controller/auth');

router.get('/', pagesController.index);
router.get('/contact-us', pagesController.contactus);
router.get('/about-us', pagesController.aboutus);
router.get('/services', pagesController.services);
router.get('/signup', authController.getSignup);
router.post('/signup', 
    [ check('email').isEmail().withMessage('Please enter valid email').custom((value, {req}) => {
        if(value === 'aaa@gmail.com'){
            throw new Error('Email is forbidden');
        }
        return true;
    }),
       body('password', 'Please enter longer password').isLength({min: 5}),
       body('confirmPassword').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Password have to match');
        }
        return true;
       })
    ], authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewpassword);
router.post('/new_password', authController.postNewpassword);

module.exports = router;