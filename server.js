const express = require('express');
const serverConfig = require('./config/serverConfig');
const body_parser = require('body-parser');
const cors = require('cors');
const router = require('./routes/routes');
const models = require('./models/index');
const bcrypt = require('bcryptjs');
const sequelize = require('./models/index').sequelize

const nodeServerPort = serverConfig.nodeServerPort
const app = express();
var corsOptions = {
  origin: function (origin, callback) {
    if (serverConfig.cors_whitelist.indexOf(origin) !== -1) {
      callback(null, true)
      console.log("cors access granted")
    } else {
      console.log("cors access denied")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true}));
app.use(cors(corsOptions));
router(app)

app.listen(nodeServerPort, () => {
    console.log('listening at ' + nodeServerPort + '...');
    init();
});

async function init(){
  try{
    //await sequelize.sync({ alter: true } )
    var [permission, isPermissionCreated] = await models.Permission.findOrCreate({ where: { permissionName: "absolute_permission" }})
    var [staff, isStaffCreated] = await models.Staff.findOrCreate({ where: { staffName: "master" }})
    var employee = await models.Employee.findOne({ where: { employeeName: "app_master" } })
    if(!employee) employee = await models.Employee.create({ employeeName: "app_master",
      employeePassword: bcrypt.hashSync("1234",10), employeeEmail: "master@gmail.com"})
    if(permission && staff && employee) {
      await staff.setPermissions(permission);
      await employee.setStaff(staff);
      console.log("server ready !");
    }else console.log("server failure !");
  }catch(err){
    console.log("error: " + err.message)
  }
}