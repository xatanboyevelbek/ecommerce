const express = require('express');
const bcrypt = require('bcryptjs');
const {check, body} = require('express-validator');
const router = express.Router();
const pagesController = require('../controller/pages');
const authController = require('../controller/auth');
const User = require('../model/user');

router.get('/', pagesController.index);
router.get('/contact-us', pagesController.contactus);
router.get('/about-us', pagesController.aboutus);
router.get('/services', pagesController.services);
router.get('/signup', authController.getSignup);
router.post('/signup', 
    [ check('email').isEmail().withMessage('Please enter valid email').custom((value, {req}) => {
        return User.findOne({email: value}).then(user => {
            if(user){
                return Promise.reject('Email is exits. Please enter another one');
            }
        })
    }).normalizeEmail(),
       body('password').isLength({min: 5}).withMessage('Please enter longer password'),
       body('confirmPassword').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Password have to match');
        }
        return true;
       })
    ], authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login',
    [ check('email').normalizeEmail().isEmail().custom((value, {req}) => {
        return User.findOne({email: value}).then(user => {
            if(!user){
                return Promise.reject('Email is not exits. Please sign up first');
            }
        })
      })
    ]
    ,authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewpassword);
router.post('/new_password', authController.postNewpassword);
router.get('/privacy-policy', pagesController.privacyPolicy);

module.exports = router;