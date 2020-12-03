const client = require('../models/index').Client
const basket = require('../models/index').Basket
const product = require('../models/index').Product
const rate = require('../models/index').Rate
const favorite = require('../models/index').Favorite
const comment = require('../models/index').Comment
const paymentCard = require('../models/index').PaymentCard
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const token_secret = require('../config/serverConfig').secret

module.exports = {
    signUp: (req, res) => {
            client.create({
                clientUserName: req.body.clientUserName,
                clientPassword: bcrypt.hashSync(req.body.clientPassword, 10),
                clientEmail: req.body.clientEmail,
                clientFullName: req.body.clientFullName,
                clientCountry: req.body.clientCountry,
                clientCity: req.body.clientCity,
                clientAddress: req.body.clientAddress,
                clientMoreData: req.body.clientMoreData,
                clientPhoneNumber: req.body.clientPhoneNumber
            }).then(client => {
                res.send({ code: 200, data: [client], message: "client created successfully !"})
            }).catch(err => {
                res.send({ code: err.code, data: [], message: err.message })
            })
        },
    signIn: async (req, res) => {
        client.findOne({ where: { clientUserName: req.body.clientUserName } })
                .then(client => {
                    if(client) {
                        bcrypt.compare(req.body.clientPassword, client.clientPassword)
                        .then(result => {
                            if(result) {
                                res.send({ 
                                    code: 200, 
                                    data: [{ 
                                        client: client, 
                                        accessToken: jwt.sign({ id: client.id }, token_secret, { expiresIn: req.body.remember ?  86400 : 3600 })
                                    }], 
                                    message: "client loggedIn successfully !"})
                           }else res.send({ code: 500, data: [], message: "Wrong password." })
                        }).catch(err => {
                            res.send({ code: err.code, data: [], message: err.message })
                        })
                    }else res.send({ code: 404, data: [], message: "Wrong Credentials." })
                }).catch(err => {
                    res.send({ code: err.code, data: [], message: err.message })
                })
    },
    fetch: (req, res) => {
        client.findAll()
        .then(clients => {
            res.send({ code: 200, data: clients, message: "clients fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    find: (req, res) => {
        client.findByPk(req.params.id)
        .then(client => {
            res.send({ code: 200, data: [client], message: "client fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    check: (req, res) => {
        client.findByPk(req.userId)
        .then(client => {
            res.send({ code: 200, data: [client], message: "client session active !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    update: (req, res) => {
        client.update({
            clientUserName: req.body.clientUserName,
            clientPassword: bcrypt.hashSync(req.body.clientPassword, 10),
            clientEmail: req.body.clientEmail,
            clientFullName: req.body.clientFullName,
            clientCountry: req.body.clientCountry,
            clientCity: req.body.clientCity,
            clientAddress: req.body.clientAddress,
            clientMoreData: req.body.clientMoreData,
            clientPhoneNumber: req.body.clientPhoneNumber,
            basketId: req.body.basketId
        },{
            where: { id: req.params.id }
        }).then(client => {
            res.send({ code: 200, data: [client], message: "client updated successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    delete: (req, res) => {
        client.destroy({
            where: { id: req.params.id }
        }).then(clients => {
            res.send({ code: 200, data: clients, message: "clients deleted successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    addCommand: async (req, res) => {
        try {
            var client = await client.findByPk(req.body.clientId)
            var basket = await basket.findByPk(req.body.basketId)
            if(!client) res.send({ code: 404, data: [], message: "client not found" })
            else if(!basket) res.send({ code: 404, data: [], message: "basket not found" })
            else {
                var result = await client.addBasket(basket)
                res.send({ code: 200, data: [result], message: "client joined Successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    addPaymentCard: async (req, res) => {
        try {
            var clientFound = await client.findByPk(req.body.clientId)
            var paymentCardFound = await paymentCard.findByPk(req.body.paymentCardId)
            if(!clientFound) res.send({ code: 404, data: [], message: "client not found" })
            else if(!paymentCardFound) res.send({ code: 404, data: [], message: "payment card not found" })
            else {
                var result = await clientFound.addPaymentCards(paymentCardFound)
                res.send({ code: 200, data: [result], message: "card added Successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    removePaymentCard: async (req, res) => {
        try {
            var clientFound = await client.findByPk(req.params.clt)
            var paymentCardFound = await paymentCard.findByPk(req.params.cd)
            if(!clientFound) res.send({ code: 404, data: [], message: "client not found" })
            else if(!paymentCardFound) res.send({ code: 404, data: [], message: "payment card not found" })
            else {
                await clientFound.removePaymentCards(paymentCardFound)
                res.send({ code: 200, data: [], message: "card removed Successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    giveRate: async (req, res) => {
        try {
            var clientFound = await client.findByPk(req.body.clientId)
            var productFound = await product.findByPk(req.body.productId)
            if(!clientFound) res.send({ code: 404, data: [], message: "client not found" })
            else if(!productFound) res.send({ code: 404, data: [], message: "product not found" })
            else {
                await rate.create({
                    productId: productFound.productId,
                    clientId: clientFound.clientId,
                    rateNote: req.body.rateNote})
                res.send({ code: 200, data: [], message: "product rated Successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    updateRate: async (req, res) => {
        try {
            var clientFound = await client.findByPk(req.body.clientId)
            var productFound = await product.findByPk(req.body.productId)
            if(!clientFound) res.send({ code: 404, data: [], message: "client not found" })
            else if(!productFound) res.send({ code: 404, data: [], message: "product not found" })
            else {
                await rate.update({
                    productId: productFound.productId,
                    clientId: clientFound.clientId,
                    rateNote: req.body.rateNote}, {
                        where: { id: req.params.id }
                    })
                res.send({ code: 200, data: [], message: "product rated Successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    addFavorite: async (req, res) => {
        try {
            var clientFound = await client.findByPk(req.body.clientId)
            var productFound = await product.findByPk(req.body.productId)
            if(!clientFound) res.send({ code: 404, data: [], message: "client not found" })
            else if(!productFound) res.send({ code: 404, data: [], message: "product not found" })
            else {
                await favorite.create({
                    productId: productFound.productId,
                    clientId: clientFound.clientId})
                res.send({ code: 200, data: [], message: "product added to favorite Successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    removeFavorite: async (req, res) => {
        try {
            var clientFound = await client.findByPk(req.body.clientId)
            var productFound = await product.findByPk(req.body.productId)
            if(!clientFound) res.send({ code: 404, data: [], message: "client not found" })
            else if(!productFound) res.send({ code: 404, data: [], message: "product not found" })
            else {
                await favorite.destroy({ where: { id: req.params.id } })
                res.send({ code: 200, data: [], message: "favorite removed Successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    addComment: async (req, res) => {
        try {
            var clientFound = await client.findByPk(req.body.clientId)
            var productFound = await product.findByPk(req.body.productId)
            if(!clientFound) res.send({ code: 404, data: [], message: "client not found" })
            else if(!productFound) res.send({ code: 404, data: [], message: "product not found" })
            else {
                await comment.create({
                    productId: productFound.productId,
                    clientId: clientFound.clientId,
                    commentContent: req.body.commentContent})
                res.send({ code: 200, data: [], message: "comment added Successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    updateComment: async (req, res) => {
        try {
            var clientFound = await client.findByPk(req.body.clientId)
            var productFound = await product.findByPk(req.body.productId)
            if(!clientFound) res.send({ code: 404, data: [], message: "client not found" })
            else if(!productFound) res.send({ code: 404, data: [], message: "product not found" })
            else {
                await comment.update({
                    productId: productFound.productId,
                    clientId: clientFound.clientId,
                    commentContent: req.body.commentContent}, {
                        where: { id: req.params.id }
                    })
                res.send({ code: 200, data: [], message: "comment updated Successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    removeComment: async (req, res) => {
        try {
            var clientFound = await client.findByPk(req.body.clientId)
            var productFound = await product.findByPk(req.body.productId)
            if(!clientFound) res.send({ code: 404, data: [], message: "client not found" })
            else if(!productFound) res.send({ code: 404, data: [], message: "product not found" })
            else {
                await rate.destroy({ where: { id: req.params.id } })
                res.send({ code: 200, data: [], message: "comment deleted Successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    }
}