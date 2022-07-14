const databaseConnection = require('../../config/database')

//get all users
const getAllUsersdb = async () => {
    const query = `SELECT nombre_usuario, nivel_acceso, fecha_nacimiento, emailusuario FROM usuariosgazeta`
    try {
        return await databaseConnection.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

//register user
const addNewUserdb = async (user) => {
    const query = `INSERT INTO usuariosgazeta SET ?`
    try {
        return await databaseConnection.query(query, user)
    } catch (error) {
        error.message = error.code
        return error
    }
}
//login user
const loginUserdb = async (email) => {
    const query = `SELECT * FROM usuariosgazeta WHERE emailusuario = '${email}'`
    try {
        return await databaseConnection.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}
//get users by id
const getUserByIddb = async (id) => {
    const query = `SELECT nombre_usuario, nivel_acceso, fecha_nacimiento, emailusuario FROM usuariosgazeta WHERE id = ${id}`
    try {
        return await databaseConnection.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}
//modify user by id
const patchUserByIddb = async (id, user) => {
    const query = `UPDATE usuariosgazeta SET ? WHERE id = ${id}`;
    try {
        return await databaseConnection.query(query, user)
    } catch (error) {
        error.message = error.code
        return error
    }
}
//delete user by id
const deleteUserByIddb = async (id) => {
    const query = `DELETE FROM usuariosgazeta WHERE id = ${id}`
    try {
        return await databaseConnection.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

module.exports = {
    addNewUserdb,
    getAllUsersdb,
    loginUserdb,
    getUserByIddb,
    patchUserByIddb,
    deleteUserByIddb
}