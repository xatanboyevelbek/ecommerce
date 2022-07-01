exports.index = (req, res, next) => {
    res.render('main/index', {
        title: "Ecommerce"
    })
}