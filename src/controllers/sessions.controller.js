import { createToken } from "../utils/jwt.js";

const register = async(req, res) => {
    try {
        res.status(200).json({status: "Success", msg: "Usuario creado correctamente"})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
}

const login = async(req, res) => {
    try {
        const token = createToken(req.user);
        res.cookie("token", token, { httpOnly: true});

        res.status(200).json({status: "Success", payload: req.user})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
}

const googleLogin = async(req, res) => {

    try {
        const token = createToken(req.user);
        res.cookie("token", token, { httpOnly: true});
    
        res.status(200).json({status: "Success", payload: req.user})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
    
}

const verifyLoggedUser = async(req, res) => {
    res.status(200).json({ status: "Success", user: req.user})
}

export default {
    register,
    login,
    googleLogin,
    verifyLoggedUser
}