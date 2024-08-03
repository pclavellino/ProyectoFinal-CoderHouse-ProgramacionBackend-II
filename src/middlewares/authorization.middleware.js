import { request, response } from "express";

export const authorization = (role) => {
    return async (req = request, res = response, next) => {
        if(!req.user) return res.status(401).json({status: "Error", msg: "Debe iniciar sesión para realizar esta tarea"});
        if(req.user.role != role) return res.status(403).json({ status: "Error", msg: "El usuario no tiene permisos de administrador para realizar esta tarea"});
        next();
    };
};