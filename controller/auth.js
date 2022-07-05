const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const User = require('../model/user');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

exports.getSignup = (req, res, next) => {
    res.render('signup', {
        title: "Signup"
    })
}
exports.postSignup = (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}).then(user => {
        if(user){
            req.flash('error','Email is already exists');
            return res.redirect('/signup');
        }
        return bcrypt.hash(password, 12).then(hashedpassword => {
            const newUser = new User({
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: hashedpassword
            });
            return newUser.save();
        }).then(() => {
            res.redirect('/login');
            return transporter.sendMail({
                to: email,
                from: 'ecommerce@elbekkhatanboyev.com',
                subject: 'Sign up succeeded!',
                html: `<h1>Dear ${firstname} ${lastname}. You successfuly signed up!!!`
            });
        })
    })
}
exports.getLogin = (req, res, next) => {
    res.render('login', {
        title: 'Log in'
    })
}
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}).then(user => {
        if(!user) {
            req.flash('error','Email is not exists. Please log in first');
            return res.redirect('/login');
        }
        return bcrypt.compare(password, user.password).then(compared => {
            if(compared){
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(() => {
                    res.redirect('/');
                })
            }
            req.flash('error','Password is wrong');
            res.redirect('/login');
        })
    })
}
exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        return res.redirect('/');
    });
}