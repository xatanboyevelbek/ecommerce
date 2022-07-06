const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../model/user');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'theshopway@outlook.com',
        pass: '27092001Elbek@'
    }
});

exports.getSignup = (req, res, next) => {
    res.render('signup', {
        title: "Signup"
    })
}
exports.postSignup = (req, res, next) => {
    const {firstname, lastname, email, password} = req.body;
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
                from: 'theshopway@outlook.com',
                subject: 'Sign up succeeded!',
                html: `<p>Dear ${firstname} ${lastname}. You successfuly signed up!!!</p>`
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
exports.getReset = (req, res, next) => {
   res.render('reset', {
    title: 'Reset Password'
   })
}
exports.postReset = (req, res, next) => {
    
}