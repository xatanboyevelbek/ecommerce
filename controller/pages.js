const fs = require('fs');
const path = require('path');

exports.index = (req, res, next) => {
    res.render('index', {
        title: "Ecommerce"
    })
}
exports.contactus = (req, res, next) => {
    res.render('contact-us', {
        title: "Contact us"
    })
}
exports.aboutus = (req, res, next) => {
    res.render('about', {
        title: "About us"
    })
}
exports.services = (req, res, next) => {
    res.render('services', {
        title: "Services"
    })
}
exports.privacyPolicy = (req, res, next) => {
    const file = path.join(process.cwd(), 'invoice', 'privacypolicy.pdf');
    fs.readFile(file, (err, data) => {
        if(err) {
            return res.status(500).send('Could download this file');
        }
        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=application.pdf');
        res.send(data);
    })
}