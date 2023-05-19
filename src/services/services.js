let bcrypt = require('bcryptjs');
const { raw } = require('body-parser');
const db = require('../models');
let salt = bcrypt.genSaltSync(10);

let createURCD = (data) => {
    
    return new Promise(async(Resolve, Reject) => {
        let passwordhandle = await handlePass(data.password)
        try{
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: passwordhandle,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1'? true : false,
                raw: true
            })
            Resolve()
        } catch(error) {
            Reject(error)
        }
    })

}
let handlePass = (pass) => {
    return new Promise(async(Resolve, Reject) => {
        try {
            const hashPass = bcrypt.hashSync(pass, salt)
            Resolve(hashPass)
        } catch(e) {
            Reject(e)
        }
    })  
}
let deleteURCD = (id) => {
    return new Promise(async(Resolve, Reject) => {
        try {
            await db.User.destroy({
                where: {id}
            })
            Resolve()
        } catch(e) {
            Reject(e)
        }
    })
}
let userEdit = (id) => {
    return new Promise( async(Resolve, Reject) => {
        try{
            let dataUser = await db.User.findOne({
                where: {id}
            })
            if(dataUser) {

                Resolve(dataUser)
            } else {
                Resolve('không có dữ liệu')
            }
        } catch(e) {
            Reject(e)
        }
    })
}
let updataUser = (data) => {
    let id = data.userID
    return new Promise(async(Resolve, Reject) => {
       try {
           let dataIDuser =  await db.User.findOne({
                where: {id},
            })
            if(dataIDuser) {
                dataIDuser.firstName = data.firstName,
                dataIDuser.lastName = data.lastName,
                dataIDuser.email = data.email,
                dataIDuser.password = data.password,
                dataIDuser.phoneNumber = data.phoneNumber,
                dataIDuser.gender = data.gender

                dataIDuser.save()
                Resolve()
            } else {
                Resolve([])
            }
       } catch(e) {
        Reject(e)
       }
    })
}
module.exports = {
    createURCD,
    deleteURCD,
    userEdit,
    updataUser
}