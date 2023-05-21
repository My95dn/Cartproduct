import controllerHomeAPI from '../controller/controllerAPI'
const passport = require('passport')
require('../middleware/passport')
let express = require('express')
let router = express.Router()
const initRouterAPI = (app) => {

    router.get('/api/login', controllerHomeAPI.getAllAPIuser)
    router.post('/api/loginUser',controllerHomeAPI.checkUserlogin)
    router.put('/api/editUser', controllerHomeAPI.editUser)
    router.delete('/api/deleteUsers', controllerHomeAPI.deletedataUser)
    router.post('/api/CreateUser' , controllerHomeAPI.createUser)
    router.post('/api/getUser', controllerHomeAPI.getUser)
    router.post('/api/Veryfy', passport.authenticate('jwt', {session: false}) , controllerHomeAPI.handleSecret)
    router.get('/api/auth/google', passport.authenticate('google-plus-token'), controllerHomeAPI.handleLoginWithGoogle)
    
    return app.use('/', router)
}
export default initRouterAPI