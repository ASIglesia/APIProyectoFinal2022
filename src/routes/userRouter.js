const {
    getAllUsers,
    getForm,
    addnewUser,
    loginUser,
    getUserById,
    patchUserById,
    forgotPass,
    resetPass,
    overwritePass,
    deleteUserById
} = require('../controllers/userController');

const {
    validatorCreateUser,
    validatorLoginUser,
    validatorOverwritePass
} = require('../validators/userValidator')

const express = require("express");
const routes=express.Router();

//get all users
routes.get("/usuarios", getAllUsers);

//register user
routes.get("/registrate", getForm);
routes.post("/registrate", validatorCreateUser, addnewUser);

//login user
routes.post("/login", validatorLoginUser, loginUser);

//get user by id
routes.get("/usuarios/:id", getUserById);

//modify user
routes.patch("/usuarios/:id", patchUserById)

//Password Reclaiming
    //forgot password 
routes.post("/login/recuperacion-contraseña",forgotPass)
    //reset password
        //GET
routes.get("/login/reestablecer-contraseña/:token",resetPass)
        //POST
routes.post("/login/reestablecer-contraseña/:token",validatorOverwritePass,overwritePass)      

//delete user by id
routes.delete("/usuarios/:id", deleteUserById);
module.exports= routes;