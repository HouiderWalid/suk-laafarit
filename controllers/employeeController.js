const Employee = require('../models/index').Employee
const Staff = require('../models/index').Staff
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const token_secret = require('../config/serverConfig').secret

module.exports = {
    signup: (req, res) => {
            Employee.create({ 
                employeeName: req.body.employeeName, 
                employeePassword: bcrypt.hashSync(req.body.employeePassword, 10),
                employeeEmail: req.body.employeeEmail
            }).then(employee => {
                var token = jwt.sign({ id: employee.id }, token_secret, { expiresIn: 86400 });
                res.send({ code: 200, data: [{ employee: employee, accessToken: token }], message: "Employee created successfully !"})
            }).catch(err => {
                res.send({ code: err.code, data: [], message: err.message })
            })
        },
    signin: async (req, res) => {
        Employee.findOne({ where: { employeeName: req.body.employeeName } })
                .then(employee => {
                    if(employee) {
                        bcrypt.compare(req.body.employeePassword, employee.employeePassword)
                        .then(result => {
                            if(result) {
                                var token = jwt.sign({ id: employee.id }, token_secret, { expiresIn: 86400 });
                                res.send({ code: 200, data: [{ employee: employee, accessToken: token }], message: "Employee logedin successfully !"})
                           }else res.send({ code: 500, data: [], message: "Wrong password." })
                        }).catch(err => {
                            res.send({ code: err.code, data: [], message: err.message })
                        })
                    }else res.send({ code: 404, data: [], message: "User not found." })
                }).catch(err => {
                    res.send({ code: err.code, data: [], message: err.message })
                })
    },
    fetch: (req, res) => {
        Employee.findAll()
        .then(employees => {
            res.send({ code: 200, data: employees, message: "Employees fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    find: (req, res) => {
        Employee.findByPk(req.params.id, { include: Staff })
        .then(employee => {
            res.send({ code: 200, data: [employee], message: "Employee fetched successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    update: (req, res) => {
        Employee.update({
            employeeName: req.body.employeeName,
            employeePassword: req.body.employeePassword,
            employeeEmail: req.body.employeeEmail,
            staffId: req.body.staffId
        },{
            where: { id: req.params.id }
        }).then(employee => {
            res.send({ code: 200, data: [employee], message: "Employee updated successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    delete: (req, res) => {
        Employee.destroy({
            where: { id: req.params.id }
        }).then(employees => {
            res.send({ code: 200, data: employees, message: "Employees deleted successfully !"})
        }).catch(err => {
            res.send({ code: err.code, data: [], message: err.message })
        })
    },
    joinStaff: async (req, res) => {
        try {
            var employee = await Employee.findByPk(req.body.employeeId)
            var staff = await Staff.findByPk(req.body.staffId)
            if(!employee) res.send({ code: 404, data: [], message: "Employee not found" })
            else if(!staff) res.send({ code: 404, data: [], message: "Staff not found" })
            else {
                var result = await employee.setStaff(staff)
                res.send({ code: 200, data: [result], message: "Employee joined Successfully !"})
            }
        } catch (err) {
            res.send({ code: err.code, data: [], message: err.message })
        }
    }
}