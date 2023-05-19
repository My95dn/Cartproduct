import controllerHome from '../controller/controllerHome'
let express = require('express')

const router = express.Router()
const routerSever = (app) => {
    router.get('/hello')
    router.get('/', controllerHome.controllerHome)
    router.post('/createUser', controllerHome.createUserdata)
    router.post('/deleteuser', controllerHome.deleteUser)
    router.get('/putUser/:id', controllerHome.editUser)
    router.post('/updateUser', controllerHome.updateUser)

    return app.use('/', router)
}
export default routerSever