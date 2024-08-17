import { Router } from "express";
import { io } from "../app.js";
import productsController from "../controllers/products.controller.js";
import cartsController from "../controllers/carts.controller.js";

const router = Router()

router.get("/", async (req, res) => {
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
            const products = await productsController.getAllProducts({category}, options)
            return res.status(200).json({status: "Success", products})
        }

        if (status) {
            const products = productsController.getAllProducts({status}, options)
            return res.status(200).json({status: "Success", products}) 
        }

        const products = await productsController.getAllProducts({}, options)
        res.render("home", { products, styles: "styles.css"} )
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
    
})

router.get("/carts/:cid", async (req, res) => {
    try {
        const {cid} = req.params
        const cart = await cartsController.getCartByID(cid)
        res.render("carts", {cart, styles: "styles.css"} )
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.get("/realtimeproducts", async (req, res) => {
    try {
        res.render("realTimeProducts", {styles: "styles.css"})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.post("/realtimeproducts", async (req, res) => {
    try {
        const { title, description, price, code, stock, category } = req.body;
        await productsController.createProduct({ title, description, price, code, stock, category })
        const products = await productsController.getAllProducts()
        io.emit("products", products.docs)
        res.render("realTimeProducts", {styles: "styles.css"})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.delete("/realtimeproducts", async (req, res) => {
    try {
        const { id } = req.body;
        await productsController.deleteProduct(id)
        const products = await productsController.getAllProducts()
        io.emit("products", products.docs)
        res.render("realTimeProducts", {styles: "styles.css"})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

export default router;