exports.index = (req, res, next) => {
    res.render('main/index', {
        title: "Ecommerce"
    })
}
exports.contactus = (req, res, next) => {
    res.render('main/contact-us', {
        title: "Contact us"
    })
}
exports.aboutus = (req, res, next) => {
    res.render('main/about', {
        title: "About us"
    })
}
exports.services = (req, res, next) => {
    res.render('main/services', {
        title: "Services"
    })
}