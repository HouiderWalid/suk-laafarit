const token_secret = require('../config/serverConfig').secret
const jwt = require("jsonwebtoken");
const Employee = require('../models/index').Employee
const Client = require('../models/index').Client

module.exports = {
    verifyEmployeeToken: (req, res, next) => {
        /*let token = req.headers["x-access-token"];
    
        if(!token) return res.send({ code: 404, data: [], message: 'No Token provided !'});
        
        jwt.verify(token, token_secret, async (err, decoded) => {
            if(err) return res.send({ code: err.code, data: [], message: err.message })
            const employee = await Employee.findByPk(decoded.id)
            if(!employee) return res.send({ code: 404, data: [], message: 'No Token provided !'});
            req.userId = decoded.id;
            next();
        });*/
    },
    verifyClientToken: (req, res, next) => {
        let token = req.headers["x-access-token"];
    
        if(!token) return res.send({ code: 404, data: [], message: 'No Token provided !'});
        
        jwt.verify(token, token_secret, (err, decoded) => {
            if(err) return res.send({ code: err.code, data: [], message: err.message })
            req.userId = decoded.id;
            next();
        });
    }
}