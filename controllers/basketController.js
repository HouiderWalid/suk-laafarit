const basket = require('../models/index').Basket
const product = require('../models/index').Product
const payment = require('../models/index').Payment
const sequelize = require('../models/index').sequelize

module.exports = {
    add: (req, res) => {
            basket.create({
                basketName: req.body.basketName
            }).then(basket => {
                res.send({ code: 200, data: [basket], message: "basket created successfully !"})
            }).catch(err => {
                res.send({ code: err.code, data: [], message: err.message })
            })
    },
    addProduct: async (req, res) => {
        try {
            var basketFound = await basket.findByPk(req.body.basketId)
            var productFound = await product.findByPk(req.body.productId)
            var productQuantity = req.body.productQuantity
            if(!basketFound) res.send({ code: 404, data: [], message: "basket not found" })
            else if(!productFound) res.send({ code: 404, data: [], message: "product not found" })
            else{
                await sequelize.transaction( async (t) => {
                    const isStockSufficient = productFound.removeStock(productQuantity, t)
                    if(isStockSufficient) basketFound.addProducts(productFound, { through: { commandQuantity: productQuantity }}, { transaction: t })
                    else res.send({ code: 404, data: [], message: "stock is not sufficient" })
                })
                res.send({ code: 200, data: [], message: "product added to the basket successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    removeProduct: async (req, res) => {
        try {
            var basketFound = await basket.findByPk(req.params.bk)
            var productFound = await product.findByPk(req.params.pd)
            if(!basketFound) res.send({ code: 404, data: [], message: "basket not found" })
            else if(!productFound) res.send({ code: 404, data: [], message: "product not found" })
            else{
                await sequelize.transaction( async (t) => {
                    productFound.addStock(productQuantity, t)
                    basketFound.removeProducts(productFound, { transaction: t })
                })
                res.send({ code: 200, data: [], message: "product removed from basket successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    payBasket: async (req, res) => {
        try {
            var basketFound = await basket.findByPk(req.body.basketId)
            var paymentFound = await payment.findByPk(req.body.paymentId)
            if(!basketFound) res.send({ code: 404, data: [], message: "Basket not found" })
            else if(!paymentFound) res.send({ code: 404, data: [], message: "Payment not found" })
            else {
                await basketFound.addPayment(permission)
                res.send({ code: 200, data: [], message: "Basket payed Successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    fetch: (req, res) => {
        basket.findAll()
        .then(baskets => {
            res.send({ code: 200, data: baskets, message: "baskets fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    find: (req, res) => {
        basket.findByPk(req.params.id)
        .then(basket => {
            res.send({ code: 200, data: [basket], message: "basket fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    update: (req, res) => {
        basket.update({
            basketName: req.body.basketName
        },{
            where: { id: req.params.id }
        }).then(basket => {
            res.send({ code: 200, data: [basket], message: "basket updated successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    delete: async (req, res) => {
        try {
            var basketFound = await basket.findByPk(req.params.id)
            await sequelize.transaction( async (t) => {
                await basketFound.removeProducts(productFound, { transaction: t })
                await basketFound.destroy()
            })
            res.send({ code: 200, data: baskets, message: "baskets deleted successfully !"})
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    }
}