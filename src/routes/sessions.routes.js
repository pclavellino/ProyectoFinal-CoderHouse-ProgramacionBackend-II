import { Router } from "express";
import passport from "passport";
import { passportCall } from "../middlewares/passport.middleware.js";
import sessionsController from "../controllers/sessions.controller.js";

const router = Router()

// Registro

router.post("/register", passportCall("register"), sessionsController.register)


// Login

router.post("/login", passportCall("login"), sessionsController.login)


// Google Login

router.get("/googleLogin", passport.authenticate("googleLogin", 
    {scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"], session: false,}),
    sessionsController.googleLogin 
    )


// Verificacion de usuario logueado

router.get("/current", passportCall("jwt"), sessionsController.verifyLoggedUser)


export default router;


