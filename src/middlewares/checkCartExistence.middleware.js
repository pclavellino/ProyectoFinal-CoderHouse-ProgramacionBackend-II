import { request, response } from "express";
import cartsServices from "../services/carts.services.js";

export const checkCartExistence = async (req = request, res = response, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartsServices.getCartByID(cid)
        if(!cart) return res.status(404).json({status:"Error", msg: "No se ha encontrado carrito con el ID especificado"})
        next();
    } catch(error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del Servidor"})
    }
}