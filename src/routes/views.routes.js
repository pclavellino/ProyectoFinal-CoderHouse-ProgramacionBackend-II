import { Router } from "express";
import productDao from "../dao/mongoDB/product.dao.js";
import cartDao from "../dao/mongoDB/cart.dao.js";
import { io } from "../app.js";

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
            const products = await productDao.getAll({category}, options)
            return res.status(200).json({status: "Success", products})
        }

        if (status) {
            const products = await productDao.getAll({status}, options)
            return res.status(200).json({status: "Success", products}) 
        }

        const products = await productDao.getAll({}, options)
        res.render("home", { products, styles: "styles.css"} )
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
    
})

router.get("/carts/:cid", async (req, res) => {
    try {
        const {cid} = req.params
        const cart = await cartDao.getById(cid)
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
        await productDao.createProd({ title, description, price, code, stock, category })
        const products = await productDao.getAll()
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
        await productDao.deleteProd(id)
        const products = await productDao.getAll()
        io.emit("products", products.docs)
        res.render("realTimeProducts", {styles: "styles.css"})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

export default router;