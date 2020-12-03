const payment = require('../models/index').Payment
const card = require('../models/index').PaymentCard

module.exports = {
    add: (req, res) => {
            payment.create({
                paymentCardId: req.body.paymentCardId,
                paymentType: req.body.paymentType,
                paymentDeliveryDate: req.body.paymentDeliveryDate,
                paymentConfirmation: req.body.paymentConfirmation
            }).then(payment => {
                res.send({ code: 200, data: [payment], message: "payment created successfully !"})
            }).catch(err => {
                res.send({ code: err.code, data: [], message: err.message })
            })
    },
    userPaymentCard: async (req, res) => {
        try {
            var paymentFound = await payment.findByPk(req.body.paymentId)
            var paymentCardFound = await card.findByPk(req.body.paymentCardId)
            if(paymentFound) res.send({ code: 404, data: [], message: "payment not found" })
            else if(paymentCardFound) res.send({ code: 404, data: [], message: "payment card not found" })
            else {
                await paymentFound.setPaymentCard(paymentCardFound)
                res.send({ code: 200, data: [], message: "payment card set not successfully" })
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    fetch: (req, res) => {
        payment.findAll()
        .then(payments => {
            res.send({ code: 200, data: payments, message: "payments fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    find: (req, res) => {
        payment.findByPk(req.params.id)
        .then(payment => {
            res.send({ code: 200, data: [payment], message: "payment fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    update: (req, res) => {
        payment.update({
            paymentCardId: req.body.paymentCardId,
            paymentType: req.body.paymentType,
            paymentDeliveryDate: req.body.paymentDeliveryDate,
            paymentConfirmation: req.body.paymentConfirmation
        },{
            where: { id: req.params.id }
        }).then(payment => {
            res.send({ code: 200, data: [payment], message: "payment updated successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    delete: (req, res) => {
        payment.destroy({
            where: { id: req.params.id }
        }).then(payments => {
            res.send({ code: 200, data: payments, message: "payments deleted successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    }
}