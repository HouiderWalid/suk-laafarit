const Permission = require('../models/index').Permission

module.exports = {
    add: (req, res) => {
            Permission.create({
                permissionName: req.body.permissionName
            }).then(permission => {
                res.send({ code: 200, data: [permission], message: "Permission created successfully !"})
            }).catch(err => {
                res.send({ code: err.code, data: [], message: err.message })
            })
    },
    fetch: (req, res) => {
        Permission.findAll()
        .then(permissions => {
            res.send({ code: 200, data: permissions, message: "Permissions fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    find: (req, res) => {
        Permission.findByPk(req.params.id)
        .then(permission => {
            res.send({ code: 200, data: [permission], message: "Permission fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    update: (req, res) => {
        Permission.update({
            permissionName: req.body.permissionName
        },{
            where: { id: req.params.id }
        }).then(permission => {
            res.send({ code: 200, data: [permission], message: "Permission updated successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    delete: (req, res) => {
        Permission.destroy({
            where: { id: req.params.id }
        }).then(permissions => {
            res.send({ code: 200, data: permissions, message: "Permissions deleted successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    }
}