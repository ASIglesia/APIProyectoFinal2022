const { check, validationResult}= require("express-validator")

//Validator User Creation
const validatorCreateUser = [
    check("nombre_usuario")
        .exists().withMessage("Se require un nombre")
        .trim()
        .notEmpty().withMessage("Nombre no puede estar vacio")
        .isLength({ min: 5, max: 90 }).withMessage("Debe tener entre 5 y 90 caracteres"),
    check("emailusuario")
        .exists().withMessage("Se require un email")
        .isEmail().withMessage("Debe ser una dirección de mail valida")
        .normalizeEmail(),
    check("contraseña")
        .exists().withMessage("Se require una contraseña")
        .isLength({min:8, max:30}).withMessage("Debe tener entre 8 y 30 caracteres")
        .trim(),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() })
        } else {
            next()
        }
    }
]

//Validator User Login
const validatorLoginUser = [
    check("emailusuario")
        .exists().withMessage("Se require un email")
        .isEmail().withMessage("Debe ser una dirección de mail valida")
        .normalizeEmail(),
    check("contraseña")
        .exists().withMessage("Se require una contraseña")
        .isLength({min:8, max:30}).withMessage("Debe tener entre 8 y 30 caracteres")
        .trim(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() })
        } else {
            next()
        }
    }
]

//Validator Password Reclaiming
const validatorOverwritePass = [
    check("passwordNew")
        .exists()
        .isLength({min:8, max:30}).withMessage("Debe tener entre 8 y 30 caracteres")
        .trim(),
    check("passwordNewCheck")
        .custom(async(passwordNewCheck,{req})=>{
            if (req.body.passwordNew !== passwordNewCheck) {
                throw new Error("Ambas contraseñas deben ser iguales")
            }
        }),
    (req,res,next)=>{
        const {token} = req.params
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const arrWarnings =errors.array()
            res.render("reset", {arrWarnings,token})
        } else {
            return next()
        }
    }
]
module.exports = {
    validatorCreateUser,
    validatorLoginUser,
    validatorOverwritePass
}