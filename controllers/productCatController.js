const Category = require('../models/index').ProductCategory
const image = require('../models/index').Image

module.exports = {
    add: (req, res) => {
            Category.create({
                CategoryName: req.body.CategoryName
            }).then(Category => {
                res.send({ code: 200, data: [Category], message: "Category created successfully !"})
            }).catch(err => {
                res.send({ code: err.code, data: [], message: err.message })
            })
    },
    addSubCategory: async (req, res) => {
        try {
            var CategoryFound = await Category.findByPk(req.body.CategoryId)
            var subCategoryFound = await product.findByPk(req.body.subCategoryId)
            if(!CategoryFound) res.send({ code: 404, data: [], message: "Category not found" })
            else if(!subCategoryFound) res.send({ code: 404, data: [], message: "subCategory not found" })
            else{
                CategoryFound.addSubCategorys(productFound)
                res.send({ code: 200, data: [Category], message: "subCategory added to the Category successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    removeSubCategory: async (req, res) => {
        try {
            var CategoryFound = await Category.findByPk(req.params.cat)
            var subCategoryFound = await product.findByPk(req.params.scat)
            if(!CategoryFound) res.send({ code: 404, data: [], message: "Category not found" })
            else if(!subCategoryFound) res.send({ code: 404, data: [], message: "subCategory not found" })
            else{
                CategoryFound.removeSubCategorys(productFound)
                res.send({ code: 200, data: [], message: "subCategory removed from the Category successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    addImage: async (req, res) => {
        try {
            var CategoryFound = await Category.findByPk(req.body.CategoryId)
            var imageFound = await image.findByPk(req.body.imageId)
            if(!CategoryFound) res.send({ code: 404, data: [], message: "Category not found" })
            else if(!imageFound) res.send({ code: 404, data: [], message: "image not found" })
            else{
                CategoryFound.addImages(imageFound)
                res.send({ code: 200, data: [Category], message: "image added to the Category successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    removeImage: async (req, res) => {
        try {
            var CategoryFound = await Category.findByPk(req.body.CategoryId)
            var imageFound = await image.findByPk(req.body.imageId)
            if(!CategoryFound) res.send({ code: 404, data: [], message: "Category not found" })
            else if(!imageFound) res.send({ code: 404, data: [], message: "image not found" })
            else{
                CategoryFound.removeImages(imageFound)
                res.send({ code: 200, data: [Category], message: "image removed from Category successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    fetch: (req, res) => {
        Category.findAll()
        .then(Categorys => {
            res.send({ code: 200, data: Categorys, message: "Categorys fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    find: (req, res) => {
        Category.findByPk(req.params.id)
        .then(Category => {
            res.send({ code: 200, data: [Category], message: "Category fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    update: (req, res) => {
        Category.update({
            CategoryName: req.body.CategoryName
        },{
            where: { id: req.params.id }
        }).then(Category => {
            res.send({ code: 200, data: [Category], message: "Category updated successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    delete: (req, res) => {
        Category.destroy({
            where: { id: req.params.id }
        }).then(Categorys => {
            res.send({ code: 200, data: Categorys, message: "Categorys deleted successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    }
}