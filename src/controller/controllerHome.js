import db from '../models/index'
import services from '../services/services'
let controllerHome = async(req, res) => {
    let dataAll = await db.User.findAll()
    return res.render('html.ejs', { data:  dataAll})
    
}

let createUserdata = async(req, res) => {
    let data = req.body
     await services.createURCD(data)
    res.redirect('/')
}
let deleteUser = async(req, res) => {
    let idUser =  req.body.userID
    if(idUser) {
       await services.deleteURCD(idUser)

      return  res.redirect('/')
    } else {
      return  res.send('erro')
    }
}
let editUser = async(req, res) => {
    let idUser = req.params.id
    if(idUser) {
      let resutl = await services.userEdit(idUser)

       return res.render('putuser.ejs', {data: resutl})
    }
}
let updateUser = async(req, res) => {
    let dataUser = req.body
    if(dataUser) {
       let resutl = await services.updataUser(dataUser)
      return res.redirect('/')
    }
}
module.exports = {
    controllerHome,
    createUserdata,
    deleteUser,
    editUser,
    updateUser
}