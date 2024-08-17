import { request, response } from "express";
import productsServices from "../services/products.services.js";

export const checkProductData = async (req = request, res = response, next) => {
    try {
        const { title, description, code, price, stock, category } = req.body;

        const newProduct = {
            title,
            description,
            code,
            price,
            stock,
            category
        };

        const products = await productsServices.getAllProducts();

        const productExists = products.docs.find( (prod) => prod.code === code );
        if(productExists) return res.status(400).json({status: "Error", msg: `Ya existe un producto con el codigo ${code}`});

        const checkData = Object.values(newProduct).includes(undefined);
        if(checkData) return res.status(400).json({success: "Error", msg: "Todos los datos son obligatorios"});

        next();

    } catch(error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del Servidor"})
    }
}