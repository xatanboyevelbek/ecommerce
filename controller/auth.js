const bcrypt = require('bcryptjs');
const User = require('../model/user');

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
            return res.redirect('/signup');
        }
        return bcrypt.hash(password, 12).then(hashedpassword => {
            const newUser = new User({
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: hashedpassword
            });
            return newUser.save(() => {
                res.redirect('/login');
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
            return res.redirect('/signup');
        }
        return bcrypt.compare(password, user.password).then(compared => {
            if(compared){
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(() => {
                    res.redirect('/');
                })
            }
            res.redirect('/login');
        })
    })
}
exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        return res.redirect('/');
    });
}