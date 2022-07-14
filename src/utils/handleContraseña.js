const bcrypt = require("bcrypt");
require('dotenv').config()
const saltRounds = parseInt(process.env.SALT_ROUNDS)

const hashContraseña = async(contraseña) => {
    const hashedContraseña = await bcrypt.hash(contraseña, saltRounds)
    return hashedContraseña
}

const checkContraseña = async(originalContraseña, hashedContraseña) => {
    const contraseñaMatch = await bcrypt.compare(originalContraseña, hashedContraseña)
    return contraseñaMatch
}

module.exports = {
    hashContraseña,
    checkContraseña
}