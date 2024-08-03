import { Router } from "express";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import { checkProductExistence } from "../middlewares/checkProductExistence.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import productDao from "../dao/mongoDB/product.dao.js";
import { authorization } from "../middlewares/authorization.middleware.js";

const router = Router()

router.get("/", passportCall("jwt"), async (req, res) => {

    try {
        const { limit, page, sort, category, status } = req.query;
        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort === "asc" ? 1 : -1,
            },
            learn: true,
        }

        if (category) {
            const products = await productDao.getAll({category}, options)
            return res.status(200).json({status: "Success", products})
        }

        if (status) {
            const products = await productDao.getAll({status}, options)
            return res.status(200).json({status: "Success", products}) 
        }

        const products = await productDao.getAll({}, options)
        res.status(200).json({status: "Success", products})

    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
    
})

router.get("/:pid", passportCall("jwt"), checkProductExistence, async (req, res) => {

    try {
        const { pid } = req.params
        const product = await productDao.getById(pid)
        res.status(200).json({status: "Success", product})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }

})

router.post("/", passportCall("jwt"), authorization("admin"), checkProductData, async (req, res) => {

    try {
        const body = req.body;
        const product = await productDao.createProd(body)
        res.status(201).json({status: "Success", product})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }

    
})

router.put("/:pid", passportCall("jwt"), authorization("admin"), checkProductExistence, async (req, res) => {

    try {
        const { pid } = req.params;
        const body = req.body;
        const updatedProduct = await productDao.updateProd(pid, body)
        res.status(200).json({status: "Success", updatedProduct})     
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }

})

router.delete("/:pid", passportCall("jwt"), authorization("admin"), checkProductExistence, async (req, res) => {

    try {
        const { pid } = req.params;
        await productDao.deleteProd(pid)
        res.status(200).json({status: "Success", msg: "Producto eliminado correctamente"})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }

})

export default router;