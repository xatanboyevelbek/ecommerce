exports.checkout = (req, res, next) => {
    res.render('main/checkout', {
        title: "Checkout"
    })
}
exports.cart = (req, res, next) => {
    res.render('main/cart', {
        title: "Cart"
    })
}
exports.myaccount = (req, res, next) => {
    res.render('main/my-account', {
        title: "My account"
    })
}
exports.shopdetail = (req, res, next) => {
    res.render('main/shop-detail', {
        title: "Shop detail"
    })
}
exports.shop = (req, res, next) => {
    res.render('main/shop', {
        title: "Shop"
    })
}
exports.wishlist = (req, res, next) => {
    res.render('main/wishlist', {
        title: "WIshlist"
    })
}