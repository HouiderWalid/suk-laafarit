const image = require('../models/index').Image

module.exports = {
    add: (req, res) => {
            image.create({
                imageName: req.body.imageName,
                imageExtension: req.body.imageExtension
            }).then(image => {
                res.send({ code: 200, data: [image], message: "image created successfully !"})
            }).catch(err => {
                res.send({ code: err.code, data: [], message: err.message })
            })
    },
    fetch: (req, res) => {
        image.findAll()
        .then(images => {
            res.send({ code: 200, data: images, message: "images fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    find: (req, res) => {
        image.findByPk(req.params.id)
        .then(image => {
            res.send({ code: 200, data: [image], message: "image fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    update: (req, res) => {
        image.update({
            imageName: req.body.imageName,
            imageExtension: req.body.imageExtension
        },{
            where: { id: req.params.id }
        }).then(image => {
            res.send({ code: 200, data: [image], message: "image updated successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    delete: (req, res) => {
        image.destroy({
            where: { id: req.params.id }
        }).then(images => {
            res.send({ code: 200, data: images, message: "images deleted successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    }
}