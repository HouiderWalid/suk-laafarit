const Staff = require('../models/index').Staff
const Permission = require('../models/index').Permission
module.exports = {
    add: (req, res) => {
        Staff.create({
            staffName: req.body.staffName
        }).then(staff => {
            res.send({ code: 200, data: [staff], message: "Staff created successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    addPermission: async (req, res) => {
        try {
            var staff = await Staff.findByPk(req.body.staffId)
            var permission = await Permission.findByPk(req.body.permissionId)
            if(!permission) res.send({ code: 404, data: [], message: "Permission not found" })
            else if(!staff) res.send({ code: 404, data: [], message: "Staff not found" })
            else {
                await staff.addPermissions(permission)
                res.send({ code: 200, data: [], message: "Permission added Successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    removePermission: async (req, res) => {
        try {
            var staff = await Staff.findByPk(req.params.st)
            var permission = await Permission.findByPk(req.params.pr)
            if(!permission) res.send({ code: 404, data: [], message: "Permission not found" })
            else if(!staff) res.send({ code: 404, data: [], message: "Staff not found" })
            else {
                await staff.removePermissions(permission)
                res.send({ code: 200, data: [], message: "Permission removed Successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    },
    fetch: (req, res) => {
        Staff.findAll()
        .then(staffs => {
            res.send({ code: 200, data: staffs, message: "Staff fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    find: (req, res) => {
        Staff.findByPk(req.params.id)
        .then(staff => {
            res.send({ code: 200, data: [staff], message: "Staff fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    update: (req, res) => {
        Staff.update({
            groupName: req.body.groupName
        },{
            where: { id: req.params.id }
        }).then(staff => {
            res.send({ code: 200, data: [staff], message: "Staff updated successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    delete: (req, res) => {
        Group.destroy({
            where: { id: req.params.id }
        }).then(staffs => {
            res.send({ code: 200, data: staffs, message: "Staff deleted successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    }
}