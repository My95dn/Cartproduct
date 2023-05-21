const jwt = require("jsonwebtoken");
require('dotenv').config()
let bcrypt = require("bcryptjs");
const db = require("../models");
import { where } from "sequelize";
let salt = bcrypt.genSaltSync(10);
let saltRounds = 10;

let getAllUser = (id) => {
  return new Promise(async (Resolve, Reject) => {
    try {
      if (id) {
        let alldataUser = await db.User.findOne({
          where: { id },
        });
        if (alldataUser) {
          Resolve(alldataUser);
        } else {
          Resolve("failure");
        }
      } else {
        let alldataUser = await db.User.findAll({
          attributes: {
            exclude: [
              "password",
              "admin",
              "refreshtoken",
              "facebookid",
              "gooleid",
            ],
          },
        });
        if (alldataUser) {
          Resolve(alldataUser);
        } else {
          Resolve("failure");
        }
      }
    } catch (e) {
      Reject(e);
    }
  });
};

let handleloginUser = (email, password) => {
  return new Promise(async (Resolve, Reject) => {
    try {
      let userEmail = email;

      let userPassword = password;
      if (!userEmail || !userPassword) {
        Resolve("undefind");
      } else {
        let userdata = await db.User.findOne({
          where: { email: userEmail },
        });
        if (userdata) {
          let checkPassword = await bcrypt.compareSync(
            userPassword,
            userdata.password
          );
          if (checkPassword) {
            let accessToken = jwt.sign(
              {
                id: userdata.id,
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 3),
              },
              process.env.PRIVATEKEY_JWT
            );
            let RefreshToken = jwt.sign(
              {
                id: userdata.id,
                iat: new Date().getTime(),

                exp: new Date().setDate(new Date().getDate() + 30),
              },
              process.env.REFRESH_JWT
            ); 
             await db.User.update(
              { refreshtoken: RefreshToken }, 
              {
                where: { id: userdata.id },
              }
            );
           
            Resolve({
              accessToken,
              RefreshToken,
            });
          } else {
            Resolve(false);
          }
        } else {
          Resolve("failure");
        }
      }
    } catch (e) {
      Reject(e);
    }
  });
};
const checkEmail = (emailUser) => {
  return new Promise(async (Resolve, Reject) => {
    try {
      if (emailUser) {
        let userEmail = await db.User.findOne({
          where: { email: emailUser },
        });
        Resolve(userEmail);
      } else {
        Resolve("no data");
      }
    } catch (e) {
      Reject(e);
    }
  });
};
const handleCreateuser = (data) => {
  return new Promise(async (Resolve, Reject) => {
    try {
      if (data) {
        let dataEmail = data.email;
        let dataEmailuser = await checkEmail(dataEmail);
        if (dataEmailuser) {
          Resolve(false);
        } else {
          await bcrypt.genSalt(saltRounds, async (err, salt) => {
            await bcrypt.hash(data.password, salt, async (err, hash) => {
              console.log("error", err);

              await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                password: hash,
              });
            });

            Resolve(true);
          });
        }
      } else {
        Resolve(false);
      }
    } catch (e) {
      Reject(e);
    }
  });
};

const handleDeleteUser = (data) => {
  return new Promise(async (Resolve, Reject) => {
    try {
      if (data) {
        await db.User.destroy({
          where: { id: data },
        });
        Resolve(true);
      } else {
        Resolve(false);
      }
    } catch (e) {
      Reject(e);
    }
  });
};
const handlegetUser = (id) => {
  return new Promise(async (Resolve, Reject) => {
    try {
      if (id) {
        let dataUser = await db.User.findOne({
          where: { id },
          attributes: { exclude: ["password"] },
        });
        Resolve(dataUser);
      } else {
        Resolve("no id");
      }
    } catch (e) {
      Reject(e);
    }
  });
};
const handleEdituser = (data) => {
  return new Promise(async (Resolve, Reject) => {
    try {
      if (data) {
        let check = await checkEmail(data.email);
        if (check) {
          Resolve(false);
        } else {
          let dataUser = await db.User.findOne({
            where: { id: data.id },
            attributes: { exclude: ["password"] },
          });
          dataUser.firstName = data.firstName;
          dataUser.lastName = data.lastName;
          dataUser.email = data.email;
          dataUser.phoneNumber = data.phoneNumber;
          dataUser.gender = data.gender;

          await db.User.update(
            { ...dataUser },
            {
              where: {
                id: data.id,
              },
            }
          );
          Resolve(true);
        }
      } else {
        Resolve(false);
      }
    } catch (e) {
      Reject(e);
    }
  });
};
const handleTokenAPI = (data) => {
  return new Promise(async(Reject, Resolve) => {
    try {
      if(data) {
      let idUser = await db.User.findOne({
          where: {id: data.id}
        })
        if(idUser) {
          Reject(true)
        } else {
          Reject(false)
        }
      } else {
        Reject(false)
      }

    } catch (error) {
      Resolve(error)
    }
  })
}
module.exports = {
  getAllUser,
  handleloginUser,
  handleCreateuser,
  handleDeleteUser,
  handlegetUser,
  handleEdituser,
  handleTokenAPI
};
