const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const {validationResult} = require('express-validator');
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
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('signup', {
            title: "Signup",
            errorMessage: errors.array()[0].msg
        })
    }
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
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({email: req.body.email}).then(user => {
            if(!user){
                req.flash('error','No account with that email found');
                return res.redirect('/reset');
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save();
        }).then(() => {
            res.redirect('/');
            return transporter.sendMail({
                to: req.body.email,
                from: 'theshopway@outlook.com',
                subject: 'Reset Password',
                html: `<html>
                          <body>
                            <h4>Dear client. You requested to reset your current password<h4>
                            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set new password</p>
                            <p>Theshopway community</p>
                          </body>
                       </html>`
            });
        }).catch(err => {
            console.log(err);
        })
   })
}
exports.getNewpassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}}).then(user => {
        res.render('newpassword', {
            title: 'Update password',
            userId: user?._id.toString(),
            passwordToken: token
        })
    })
}
exports.postNewpassword = (req, res, next) => {
    const newpassword =  req.body.newpassword;
    const userid = req.body.userid;
    const passwordToken = req.body.passwordToken;
    let resetuser;

    User.findOne({_id: userid, resetToken: passwordToken, resetTokenExpiration: {$gt: Date.now()}}).then(user => {
            resetuser = user;
            return bcrypt.hash(newpassword, 12);
        }).then(hashedPassword => {
            resetuser.password = hashedPassword;
            resetuser.resetToken = undefined,
            resetuser.resetTokenExpiration = undefined;
            return resetuser.save();
        }).then(() => {
            res.redirect('/login');
        }).catch(err => {
            console.log(err);
        })
}