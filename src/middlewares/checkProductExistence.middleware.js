import { request, response } from "express";
import productDao from "../dao/mongoDB/product.dao.js";


export const checkProductExistence = async (req = request, res = response, next) => {

    try {
        const { pid } = req.params;
        const product = await productDao.getById(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id especificado` });
        next();
    } catch(error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del Servidor"})
    }
}