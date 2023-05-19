import db from "../models/index";
import servicesAPI from "../services/servicesAPI";

let getAllAPIuser = async (req, res) => {
  let UserID = req.query.id;
  let dataUserAll = await servicesAPI.getAllUser(UserID);
  if (dataUserAll) {
    return res.status(200).json({
      message: "success",
      dataUserAll,
    });
  } else {
    return res.status(200).json({
      message: "failure",
    });
  }
};

let checkUserlogin = async (req, res) => {
  let dataUser = req.body.email;
  let passwordUser = req.body.password;
  if (!dataUser) {
    return res.status(200).json({
      message: "Please enter full information",
    });
  }

  let userData = await servicesAPI.handleloginUser(dataUser, passwordUser);
  
  if (userData) {
    res.setHeader(userData)
    return res.status(200).json({
      user: true,
      message: "success",

    });
  } else {
    return res.status(200).json({
      user: false,
      message: "failure",
    });
  }
};

const createUser = async (req, res) => {
  let dataUser = req.body;
  console.log("check", dataUser);
  if (!dataUser) {
    return res.status(200).json({
      message: "Please enter full information",
    });
  }
  let data = await servicesAPI.handleCreateuser(dataUser);
  if (data) {
    return res.status(200).json({
      message: "success",
    });
  } else {
    return res.status(200).json({
      message: "failure",
    });
  }
};

const deletedataUser = async (req, res) => {
  let idUser = req.body.id;
  console.log("check", idUser);
  let data = await servicesAPI.handleDeleteUser(idUser);
  if (data) {
    return res.status(200).json({
      message: "success",
    });
  } else {
    return res.status(200).json({
      message: "failure",
    });
  }
};
const getUser = async (req, res) => {
  let iduserEdit = req.body.data.id;
  console.log("check", iduserEdit);
  if (iduserEdit) {
    let data = await servicesAPI.handlegetUser(iduserEdit);
    if (data) {
      return res.status(200).json({
        message: "success",
        dataUser: data,
      });
    } else {
      return res.status(200).json({
        message: "failure",
      });
    }
  } else {
    return res.status(200).json({
      message: "failure",
    });
  }
};
const editUser = async (req, res) => {
  let data = req.body;

  let dataUser = await servicesAPI.handleEdituser(data);
  if (dataUser) {
    return res.status(200).json({
      message: "success",
    });
  } else {
    return res.status(200).json({
      message: "failure",
    });
  }
};
const handleSecret = (req, res) => {
  return res.status(200).json({
    message: "success",
  });
};
module.exports = {
  getAllAPIuser,
  checkUserlogin,
  createUser,
  deletedataUser,
  getUser,
  editUser,
  handleSecret,
};
