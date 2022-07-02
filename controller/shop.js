exports.checkout = (req, res, next) => {
    res.render('checkout', {
        title: "Checkout"
    })
}
exports.cart = (req, res, next) => {
    res.render('cart', {
        title: "Cart"
    })
}
exports.myaccount = (req, res, next) => {
    res.render('my-account', {
        title: "My account"
    })
}
exports.shopdetail = (req, res, next) => {
    res.render('shop-detail', {
        title: "Shop detail"
    })
}
exports.shop = (req, res, next) => {
    res.render('shop', {
        title: "Shop"
    })
}
exports.wishlist = (req, res, next) => {
    res.render('wishlist', {
        title: "WIshlist"
    })
}