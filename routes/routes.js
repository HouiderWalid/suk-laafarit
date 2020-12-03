const controllers = require('../controllers/mainController')
const middlewares = require('../middleware/authMiddleware')

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header("x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post('/', (req, res) => {
        res.status(200).send({message: 'Welcome to the beginning of nothingness.' });
    })

    // Employee Api
    app.get('/employee', middlewares.verifyEmployeeToken, controllers.employeeController.fetch)
    app.get('/employee/:id', middlewares.verifyEmployeeToken, controllers.employeeController.find)
    app.post('/employee/signup', controllers.employeeController.signup) // Create an Employee and login it in
    app.post('/employee/join', middlewares.verifyEmployeeToken, controllers.employeeController.joinStaff) // Give the Employee a group of permissions
    app.post('/employee/signin', controllers.employeeController.signin) // Login the Employee
    app.put('/employee/:id', middlewares.verifyEmployeeToken, controllers.employeeController.update)
    app.delete('/employee/:id', middlewares.verifyEmployeeToken, controllers.employeeController.delete)

    // Staff Api
    app.get('/staff', middlewares.verifyEmployeeToken, controllers.staffController.fetch)
    app.get('/staff/:id', middlewares.verifyEmployeeToken, controllers.staffController.find)
    app.post('/staff/add', middlewares.verifyEmployeeToken, controllers.staffController.add)
    app.post('/staff/permission/add', middlewares.verifyEmployeeToken, controllers.staffController.addPermission) // Add a permission to a set of permissions
    app.delete('/staff/permission/:st/:pr', middlewares.verifyEmployeeToken, controllers.staffController.removePermission) // Remove a permission to a set of permissions
    app.put('/staff/:id', middlewares.verifyEmployeeToken, controllers.staffController.update)
    app.delete('/staff/:id', middlewares.verifyEmployeeToken, controllers.staffController.delete)
    
    // Permissions Api
    app.get('/permission', middlewares.verifyEmployeeToken, controllers.permissionController.fetch)
    app.get('/permission/:id', middlewares.verifyEmployeeToken, controllers.permissionController.find)
    app.post('/permission/add', middlewares.verifyEmployeeToken, controllers.permissionController.add)
    app.put('/permission/:id', middlewares.verifyEmployeeToken, controllers.permissionController.update)
    app.delete('/permission/:id', middlewares.verifyEmployeeToken, controllers.permissionController.delete)

    // Client Api
    app.get('/client', middlewares.verifyClientToken, controllers.clientController.fetch)
    app.get('/client/check', middlewares.verifyClientToken, controllers.clientController.check)
    app.get('/client/:id', middlewares.verifyClientToken, controllers.clientController.find)
    app.post('/client/signup', controllers.clientController.signUp) // Create a Client and login it in
    app.post('/client/cmd', middlewares.verifyClientToken, controllers.clientController.addCommand) // Create a command for the Client
    app.post('/client/card', middlewares.verifyClientToken, controllers.clientController.addPaymentCard) // Add the Client's payment cards
    app.post('/client/card/:clt/:cd', middlewares.verifyClientToken, controllers.clientController.removePaymentCard) // Remove the Client's payment cards
    app.post('/client/rate', middlewares.verifyClientToken, controllers.clientController.giveRate) // Rate a product
    app.put('/client/rate/:id', middlewares.verifyClientToken, controllers.clientController.updateRate) // Update product rate
    app.post('/client/favorite', middlewares.verifyClientToken, controllers.clientController.addFavorite) // Add a favorite product
    app.delete('/client/favorite/:id', middlewares.verifyClientToken, controllers.clientController.removeFavorite) // Remove a favorite product
    app.post('/client/comment', middlewares.verifyClientToken, controllers.clientController.addComment) // Add comment
    app.put('/client/comment/:id', middlewares.verifyClientToken, controllers.clientController.updateComment) // Update a comment
    app.delete('/client/comment/id', middlewares.verifyClientToken, controllers.clientController.removeComment) // Delete a comment
    app.post('/client/signin', controllers.clientController.signIn) // Login the Client
    app.put('/client/:id', middlewares.verifyClientToken, controllers.clientController.update)
    app.delete('/client/:id', middlewares.verifyClientToken, controllers.clientController.delete)

    // Payment Card Api
    app.get('/card', middlewares.verifyClientToken, controllers.cardController.fetch)
    app.get('/card/:id', middlewares.verifyClientToken, controllers.cardController.find)
    app.post('/card/add', middlewares.verifyClientToken, controllers.cardController.add)
    app.put('/card/:id', middlewares.verifyClientToken, controllers.cardController.update)
    app.delete('/card/:id', middlewares.verifyClientToken, controllers.cardController.delete)

    // Image Api
    app.get('/image', middlewares.verifyClientToken, controllers.imageController.fetch)
    app.get('/image/:id', middlewares.verifyClientToken, controllers.imageController.find)
    app.post('/image/add', middlewares.verifyClientToken, controllers.imageController.add)
    app.put('/image/:id', middlewares.verifyClientToken, controllers.imageController.update)
    app.delete('/image/:id', middlewares.verifyClientToken, controllers.imageController.delete)

    // Product Api
    app.get('/product', middlewares.verifyClientToken, controllers.productController.fetch)
    app.get('/product/:id', middlewares.verifyClientToken, controllers.productController.find)
    app.post('/product/add', middlewares.verifyClientToken, controllers.productController.add)
    app.post('/product/image/add', middlewares.verifyClientToken, controllers.productController.addImage) // Add images to a product
    app.delete('/product/image/:pd/:img', middlewares.verifyClientToken, controllers.productController.removeImage) // Remove images from a product
    app.put('/product/:id', middlewares.verifyClientToken, controllers.productController.update)
    app.delete('/product/:id', middlewares.verifyClientToken, controllers.productController.delete)

    // Product Category
    app.get('/category', middlewares.verifyClientToken, controllers.productCatController.fetch)
    app.get('/category/:id', middlewares.verifyClientToken, controllers.productCatController.find)
    app.post('/category/add', middlewares.verifyClientToken, controllers.productCatController.add)
    app.post('/category/subcategory/add', middlewares.verifyClientToken, controllers.productCatController.addSubCategory)
    app.delete('/category/subcategory/:cat/:scat', middlewares.verifyClientToken, controllers.productCatController.removeSubCategory)
    app.post('/category/image/add', middlewares.verifyClientToken, controllers.productCatController.addSubCategory)
    app.delete('/category/image/:cat/:img', middlewares.verifyClientToken, controllers.productCatController.removeImage)
    app.put('/category/:id', middlewares.verifyClientToken, controllers.productCatController.update)
    app.delete('/category/:id', middlewares.verifyClientToken, controllers.productCatController.delete)

    // Product SubCategory
    app.get('/subcategory', middlewares.verifyClientToken, controllers.productSubCatController.fetch)
    app.get('/subcategory/:id', middlewares.verifyClientToken, controllers.productSubCatController.find)
    app.post('/subcategory/add', middlewares.verifyClientToken, controllers.productSubCatController.add)
    app.post('/subcategory/product/add', middlewares.verifyClientToken, controllers.productSubCatController.addProduct)
    app.delete('/subcategory/product/:scat/:pd', middlewares.verifyClientToken, controllers.productSubCatController.removeProduct)
    app.post('/subcategory/image/add', middlewares.verifyClientToken, controllers.productCatController.addImage)
    app.delete('/subcategory/image/:scat/:img', middlewares.verifyClientToken, controllers.productCatController.removeImage)
    app.put('/subcategory/:id', middlewares.verifyClientToken, controllers.productSubCatController.update)
    app.delete('/subcategory/:id', middlewares.verifyClientToken, controllers.productSubCatController.delete)

    // Basket
    app.get('/basket', middlewares.verifyClientToken, controllers.basketController.fetch)
    app.get('/basket/:id', middlewares.verifyClientToken, controllers.basketController.find)
    app.post('/basket/add', middlewares.verifyClientToken, controllers.basketController.add)
    app.post('/basket/product/add', middlewares.verifyClientToken, controllers.basketController.addProduct) // Add a product to a basket
    app.delete('/basket/product/:bk/:pd', middlewares.verifyClientToken, controllers.basketController.removeProduct) // Remove a product from a basket
    app.post('/basket/payment', middlewares.verifyClientToken, controllers.basketController.payBasket) // Set a payment for a basket
    app.put('/basket/:id', middlewares.verifyClientToken, controllers.basketController.update)
    app.delete('/basket/:id', middlewares.verifyClientToken, controllers.basketController.delete)

    // Payment
    app.get('/payment', middlewares.verifyClientToken, controllers.paymentController.fetch)
    app.get('/payment/card', middlewares.verifyClientToken, controllers.paymentController.userPaymentCard) // Use a payment card for the payment
    app.get('/payment/:id', middlewares.verifyClientToken, controllers.paymentController.find)
    app.post('/payment/add', middlewares.verifyClientToken, controllers.paymentController.add)
    app.put('/payment/:id', middlewares.verifyClientToken, controllers.paymentController.update)
    app.delete('/payment/:id', middlewares.verifyClientToken, controllers.paymentController.delete)

}