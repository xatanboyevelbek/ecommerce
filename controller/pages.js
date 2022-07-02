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