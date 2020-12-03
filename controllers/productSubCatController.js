const productSubCategorie = require('../models/index').ProductproductSubCategorie
const product = require('../models/index').Product
const image = require('../models/index').Image

module.exports = {
    add: (req, res) => {
            productSubCategorie.create({
                productSubCategorieName: req.body.productSubCategorieName
            }).then(productSubCategorie => {
                res.send({ code: 200, data: [productSubCategorie], message: "productSubCategorie created successfully !"})
            }).catch(err => {
                res.send({ code: err.code, data: [], message: err.message })
            })
    },
    addProduct: async (req, res) => {
        try {
            var subCategorieFound = await productSubCategorie.findByPk(req.body.subCategorieId)
            var productFound = await product.findByPk(req.body.productId)
            if(!productFound) res.send({ code: 404, data: [], message: "product not found" })
            else if(!subCategorieFound) res.send({ code: 404, data: [], message: "subCategorie not found" })
            else{
                subCategorieFound.addProducts(productFound)
                res.send({ code: 200, data: [], message: "product added to the subCategorie successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },removeProduct: async (req, res) => {
        try {
            var subCategorieFound = await productSubCategorie.findByPk(req.params.scat)
            var productFound = await product.findByPk(req.params.pd)
            if(!productFound) res.send({ code: 404, data: [], message: "product not found" })
            else if(!subCategorieFound) res.send({ code: 404, data: [], message: "subCategorie not found" })
            else{
                subCategorieFound.removeProducts(productFound)
                res.send({ code: 200, data: [], message: "product removed from subCategorie successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    addImage: async (req, res) => {
        try {
            var subCategorieFound = await productSubCategorie.findByPk(req.body.subCategorieId)
            var imageFound = await product.findByPk(req.body.imageId)
            if(!imageFound) res.send({ code: 404, data: [], message: "image not found" })
            else if(!subCategorieFound) res.send({ code: 404, data: [], message: "subCategorie not found" })
            else{
                subCategorieFound.addImages(productFound)
                res.send({ code: 200, data: [], message: "image removed from subCategorie successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    removeImage: async (req, res) => {
        try {
            var subCategorieFound = await productSubCategorie.findByPk(req.params.scat)
            var imageFound = await product.findByPk(req.params.img)
            if(!imageFound) res.send({ code: 404, data: [], message: "image not found" })
            else if(!subCategorieFound) res.send({ code: 404, data: [], message: "subCategorie not found" })
            else{
                subCategorieFound.removeImages(productFound)
                res.send({ code: 200, data: [], message: "image removed from subCategorie successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    fetch: (req, res) => {
        productSubCategorie.findAll()
        .then(productSubCategories => {
            res.send({ code: 200, data: productSubCategories, message: "productSubCategories fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    find: (req, res) => {
        productSubCategorie.findByPk(req.params.id)
        .then(productSubCategorie => {
            res.send({ code: 200, data: [productSubCategorie], message: "productSubCategorie fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    update: (req, res) => {
        productSubCategorie.update({
            productSubCategorieName: req.body.productSubCategorieName
        },{
            where: { id: req.params.id }
        }).then(productSubCategorie => {
            res.send({ code: 200, data: [productSubCategorie], message: "productSubCategorie updated successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    delete: (req, res) => {
        productSubCategorie.destroy({
            where: { id: req.params.id }
        }).then(productSubCategories => {
            res.send({ code: 200, data: productSubCategories, message: "productSubCategories deleted successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    }
}