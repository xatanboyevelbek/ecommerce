const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

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
    const document = path.join(process.cwd(), 'invoice', 'privacypolicy.pdf');
    const pdfkit = new PDFDocument();
    res.setHeader('Content-type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=application.pdf');
    pdfkit.pipe(fs.createWriteStream(document));
    pdfkit.pipe(res);
    pdfkit.fontSize(34).text('Privacy Policy', {
        underline: true,
        width: 300
    });
    pdfkit.addPage().fillColor('blue');
    pdfkit.end();
}