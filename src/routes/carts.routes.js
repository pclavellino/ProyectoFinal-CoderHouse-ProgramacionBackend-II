import { Router } from "express";
import cartDao from "../dao/mongoDB/cart.dao.js";
import { checkCartExistence } from "../middlewares/checkCartExistence.middleware.js";
import { checkProductExistence } from "../middlewares/checkProductExistence.middleware.js"

const router = Router()

router.post("/", async (req, res) => {

    try {
        const cart = await cartDao.createCart()
        res.status(201).json({status: "Success", cart})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.get("/:cid", checkCartExistence, async (req, res) => {

    try {
        const { cid } = req.params;
        const cart = await cartDao.getById(cid)
        res.status(200).json({status: "Success", cart})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.post("/:cid/product/:pid", checkCartExistence, checkProductExistence, async (req, res) => {

    try {
        const { cid, pid } = req.params;
        const cartUpdate = await cartDao.addProductToCart(cid, pid)     
        res.status(200).json({status: "Success", cartUpdate})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.put("/:cid/product/:pid", checkCartExistence, checkProductExistence, async (req, res) => {

    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cartUpdate = await cartDao.updateQuantity(cid, pid, quantity)    
        res.status(200).json({status: "Success", cartUpdate})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.delete("/:cid/product/:pid", checkCartExistence, checkProductExistence, async (req, res) => {

    try {
        const { cid, pid } = req.params;
        const cartUpdate = await cartDao.deleteProductfromCart(cid, pid)    
        res.status(200).json({status: "Success", cartUpdate})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.delete("/:cid", checkCartExistence, async (req, res) => {

    try {
        const { cid } = req.params;
        const cartUpdate = await cartDao.emptyCart(cid)    
        res.status(200).json({status: "Success", cartUpdate})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

export default router;