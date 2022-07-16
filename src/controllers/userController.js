const {
    addNewUserdb,
    getAllUsersdb,
    loginUserdb,
    getUserByIddb,
    patchUserByIddb,
    deleteUserByIddb
} = require("../models/userModel")
const { hashContraseña, checkContraseña } = require("../utils/handleContraseña");
const { tokenSign, tokenVerify } = require("../utils/handleJWToken");
const nodemailer = require("nodemailer");
// No puedo lograr utilizar matched data ya que devuelve un intervalo vacio, investigar uso apropiado
//const { matchedData } = require("express-validator")

//get all users: Muestra todos los usuarios
const getAllUsers = async (req,res,next) => {
    const dbResponse = await getAllUsersdb();
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.length ? res.status(200).json(dbResponse) : next()
};

//register user: Registra un nuevo usuario
const addnewUser = async (req,res,next)=>{
    const nombre_usuario = await req.body.nombre_usuario;
    const nivel_acceso = await req.body.nivel_acceso;
    const fecha_nacimiento = await req.body.fecha_nacimiento;
    const emailusuario = await req.body.emailusuario;
    const contraseña = await hashContraseña(req.body.contraseña);
    const dbResponse = await addNewUserdb({nombre_usuario,nivel_acceso,contraseña,fecha_nacimiento,emailusuario});
    if (dbResponse instanceof Error) return next(dbResponse);
};
//login user: Proceso de logueo del usuario, con integracion de JWToken
const loginUser = async (req,res,next) => {
    const email = await req.body.emailusuario;
    const dbResponse = await loginUserdb(email);
    if (!dbResponse.length) return next();
    if (await checkContraseña(req.body.contraseña, dbResponse[0].contraseña)) {
        const user = {
            id: dbResponse[0].id,
            name: dbResponse[0].nombre_usuario,
            email: dbResponse[0].emailusuario
        };
        const tokenData = {
            token: await tokenSign(user, "2h"),
            user,
        };
        res
            .status(200)
            .json({ message: `Usuario ${user.name} Logeado`, Token_info: tokenData})
    } else {
        let error = new Error();
        error.status = 401;
        error.message = "No Autorizado";
        next(error);
    }
};
//get user by id: Muestra el usuario segun ID dada
const getUserById = async (req,res,next) => {
    const id = Number(req.params.id);
    const dbResponse = await getUserByIddb(id);
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.length ? res.status(200).json(dbResponse) : next();
};
//modify user by id: Modifica el usuario segun ID dada
const patchUserById = async (req,res,next) => {
    const id = Number(req.params.id);
    const dbResponse = await patchUserByIddb(id, req.body);
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.affectedRows ? res.status(200).json(req.body) : next();
};
//Password Reclaiming
    //nodemailer: Prepara la informacion que nodemailer necesita para enviar el mail
const transport = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 4006,
    auth: {
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
})
    //forgot password: Comando que inicia el proceso de reestauracion de la contraseña del usuario en el caso de que sea olvidada
const forgotPass =async (req,res,next)=>{
    const email = await req.body.emailusuario;
    const dbResponse = await loginUserdb(email);
    if (!dbResponse.length) return next();
    const user = {
        id: dbResponse[0].id,
        name: dbResponse[0].nombre_usuario,
        email: dbResponse[0].emailusuario
    };
    const token = await tokenSign(user, "10m");
    const link = `${process.env.PUBLIC_URL}/login/reestablecer-contraseña/${token}`
    const mailDetails = {
        from: "gazetatest56@zohomail.com",
        to: user.email,
        subject: "Reestableceer Contraseña",
        html: `
        <h2>Servicio de Reestablecimiento de Contraseña</h2>
        <p>Para reestableceer su contraseña haga click en el link proporcionado y siga las instrucciones dadas ahí</p>
        <p>En el caso que usted no quiera reestableceer su contraseña, simplemente ignore este mensaje</p>
        <a href="${link}">Haga Click Aquí</a>
        `
    }
    transport.sendMail(mailDetails, (err,data)=>{
        if(err) return next(err);
        res.status(200).json({ message: `Hola usuario ${user.name}, enviamos un email con instrucciones para reestableceer su contraseña a ${user.email}. Tienes 10 minutos para realizar el cambio de contraseña.` })
    })
}
    //reset password: seccion para el cambio de la contraseña
        //GET: obtener el formulario de recuperacion
const resetPass = async (req,res,next)=>{
    const token = req.params.token;
    const tokenStatus = await tokenVerify(req.params.token);
    if (tokenStatus instanceof Error) {
        res.status(403).json({ message: "Token invalido o expirado"})
    } else {
        res.render("Se resetea la contraseña de este usuario",{ token, tokenStatus})
    };
}
        //POST Reescribe la nueva contraseña
const overwritePass = async (req,res,next)=>{
    const {token}=req.params;
    const tokenStatus = await tokenVerify(token);
    if (tokenStatus instanceof Error) return next(tokenStatus);
    const password = await hashContraseña(req.body.passwordNew)
    const dbResponse = await patchUserByIddb(tokenStatus.id, {password})
    dbResponse instanceof Error ? next(dbResponse) : res.status(200).json({message:`Contraseña cambiada para usuario ${tokenStatus.name}`})
}

//delete user by id: Elimina el usuario segun ID dada
const deleteUserById = async (req,res,next) => {
    const id = Number(req.params.id);
    const dbResponse = await deleteUserByIddb(id);
    console.log("Se ha eliminado el siguiente Usuario ",dbResponse)
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.affectedRows ? res.status(204).end() : next();
};
module.exports= {
    getAllUsers,
    addnewUser,
    loginUser,
    getUserById,
    patchUserById,
    forgotPass,
    resetPass,
    overwritePass,
    deleteUserById
};