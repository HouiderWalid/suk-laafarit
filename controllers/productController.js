const product = require('../models/index').Product
const image = require('../models/index').Image

module.exports = {
    add: (req, res) => {
            product.create({
                productCode: req.body.productCode,
                productName: req.body.productName,
                productBrand: req.body.productBrand,
                productPrice: req.body.productPrice,
                productDescription: req.body.productDescription
            }).then(product => res.send({ code: 200, data: [product], message: "product created successfully !"})
            ).catch(err => res.send({ code: err.code, data: [], message: err.message }))
    },
    addImage: async (req, res) => {
        try {
            var productFound = await product.findByPk(req.body.productId)
            var imageFound = await image.findByPk(req.body.imageId)
            if(!productFound) res.send({ code: 404, data: [], message: "product not found" })
            else if(!imageFound) res.send({ code: 404, data: [], message: "image not found" })
            else{
                productFound.addImages(imageFound)
                res.send({ code: 200, data: [product], message: "image added to the product successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    removeImage: async (req, res) => {
        try {
            var productFound = await product.findByPk(req.params.pd)
            var imageFound = await image.findByPk(req.params.img)
            if(!productFound) res.send({ code: 404, data: [], message: "product not found" })
            else if(!imageFound) res.send({ code: 404, data: [], message: "image not found" })
            else{
                productFound.removeImages(imageFound)
                res.send({ code: 200, data: [product], message: "image removed from the product successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    addStock: (quantity, t) => {
        product.findByPk(req.body.productId)
               .then(product => {
                    product.update({ productStock: product.productStock + quantity }, { transaction: t })
               }).catch(err => res.send({ code: err.code, data: [], message: err.message }))
    },
    removeStock: (quantity, t) => {
        product.findByPk(req.body.productId)
               .then(product => {
                    if(product.productStock > quantity) return product.update({ productStock: product.productStock - quantity }, { transaction: t })
               }).catch(err => res.send({ code: err.code, data: [], message: err.message }))
    },
    fetch: (req, res) => {
        product.findAll()
        .then(products => {
            res.send({ code: 200, data: products, message: "products fetched successfully !"})
        }).catch(err => res.send({ code: err.code, data: [], message: err.message }))
    },
    find: (req, res) => {
        product.findByPk(req.params.id)
        .then(product => {
            res.send({ code: 200, data: [product], message: "product fetched successfully !"})
        }).catch(err => res.send({ code: err.code, data: [], message: err.message }))
    },
    update: (req, res) => {
        product.update({
            productCode: req.body.productCode,
            productName: req.body.productName,
            productBrand: req.body.productBrand,
            productPrice: req.body.productPrice,
            productDescription: req.body.productDescription
        },{
            where: { id: req.params.id }
        }).then(product => {
            res.send({ code: 200, data: [product], message: "product updated successfully !"})
        }).catch(err => res.send({ code: err.code, data: [], message: err.message }))
    },
    delete: (req, res) => {
        product.destroy({ where: { id: req.params.id }})
        .then(products => res.send({ code: 200, data: products, message: "products deleted successfully !"})
        .catch(err => res.send({ code: err.code, data: [], message: err.message })))
    }
}