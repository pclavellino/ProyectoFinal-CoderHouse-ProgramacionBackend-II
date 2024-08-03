import { Router } from "express";
import passport from "passport";
import { passportCall } from "../middlewares/passport.middleware.js";
import { createToken } from "../utils/jwt.js";

const router = Router()

// Registro

router.post("/register", passportCall("register"), async (req, res) => {
    try {
        res.status(200).json({status: "Success", msg: "Usuario creado correctamente"})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})


// Login

router.post("/login", passportCall("login"), async (req, res) => {
    try {
        const token = createToken(req.user);
        res.cookie("token", token, { httpOnly: true});

        res.status(200).json({status: "Success", payload: req.user})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})


// Google Login

router.get("/googleLogin", passport.authenticate("googleLogin", 
    {scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"], session: false,}), 
    async (req, res) => {
    try {
        const token = createToken(req.user);
        res.cookie("token", token, { httpOnly: true});

        res.status(200).json({status: "Success", payload: req.user})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})


// Verificacion de usuario logueado

router.get("/current", passportCall("jwt"), async (req, res) => {
    res.status(200).json({ status: "Success", user: req.user})
})


export default router;


