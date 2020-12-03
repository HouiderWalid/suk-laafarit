const card = require('../models/index').PaymentCard

module.exports = {
    add: (req, res) => {
            card.create({
                cardName: req.body.cardName,
                cardNumber: req.body.cardNumber,
                cardCVV: req.body.cardCVV,
                cardExpirationMonth: req.body.cardExpirationMonth,
                cardExpirationYear: req.body.cardExpirationYear
            }).then(card => {
                res.send({ code: 200, data: [card], message: "card created successfully !"})
            }).catch(err => {
                res.send({ code: err.code, data: [], message: err.message })
            })
    },
    fetch: (req, res) => {
        card.findAll()
        .then(cards => {
            res.send({ code: 200, data: cards, message: "cards fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    find: (req, res) => {
        card.findByPk(req.params.id)
        .then(card => {
            res.send({ code: 200, data: [card], message: "card fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    update: (req, res) => {
        card.update({
            cardName: req.body.cardName,
            cardNumber: req.body.cardNumber,
            cardCVV: req.body.cardCVV,
            cardExpirationMonth: req.body.cardExpirationMonth,
            cardExpirationYear: req.body.cardExpirationYear
        },{
            where: { id: req.params.id }
        }).then(card => {
            res.send({ code: 200, data: [card], message: "card updated successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    delete: (req, res) => {
        card.destroy({
            where: { id: req.params.id }
        }).then(cards => {
            res.send({ code: 200, data: cards, message: "cards deleted successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    }
}