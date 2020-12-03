var router = require('express').Router()
var faker = require('faker')
var Product = require('../models/product')
var express = require('express')

//router.use('/public', express.static('public'))

router.get('/add-product', function (req, res, next) {
    res.render('main/add-product')
})

router.get('/', function (req, res, next) {
    res.render('./index')
})

router.get('/alert', function (req, res, next) {
    res.render('main/alert')
})
router.post('/add-product', function (req, res) {
    console.log(req.body)
    var product = new Product()
    product.katagori = req.body.category_name
    product.name = req.body.product_name
    product.price = req.body.product_price
    product.cover = faker.image.image()

    product.save().then((data) => {
        console.log(data)
        // res.redirect('/add-product')
    }).catch((err) => {
        console.log(err)
    })

})

module.exports = router

router.get('/generate-fake-data', function (req, res, next) { // Untuk fake data
    for (var i = 0; i < 90; i++) {
        var product = new Product()

        product.category = faker.commerce.department()
        product.name = faker.commerce.productName()
        product.price = faker.commerce.price()
        product.cover = faker.image.image()

        product.save(function (err) {
            if (err) throw err
        })
    }
    res.redirect('/add-product')
})


router.get('/products/:page', function (req, res, next) { // untuk pagination
    var perPage = 9 // ini menunjukan max item per page.
    var page = req.params.page || 1

    Product // kita mencari semua dokumen di product ( product find.)
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage) // limit nya 9
        .exec(function (err, products) {
            Product.count().exec(function (err, count) { // menghitung nombor page
                if (err) return next(err)
                res.render('main/products', {
                    products: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})

