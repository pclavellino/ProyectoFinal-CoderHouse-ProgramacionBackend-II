import cartsServices from "../services/carts.services.js"
import ticketServices from "../services/tickets.services.js"

const createCart = async(req, res) => {
    try {
        const cart = await cartsServices.createCart()
        res.status(201).json({status: "Success", cart})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
}

const getCartByID = async(req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsServices.getCartByID(cid)
        res.status(200).json({status: "Success", cart})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
}

const addProductToCart = async(req, res) => {
    try {
        const { cid, pid } = req.params;
        const cartUpdate = await cartsServices.addProductToCart(cid, pid)     
        res.status(200).json({status: "Success", cartUpdate})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
}

const deleteProductFromCart = async(req, res) => {
    try {
        const { cid, pid } = req.params;
        const cartUpdate = await cartsServices.deleteProductFromCart(cid, pid)    
        res.status(200).json({status: "Success", cartUpdate})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
}

const updateQuantity = async(req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cartUpdate = await cartsServices.updateQuantity(cid, pid, quantity)    
        res.status(200).json({status: "Success", cartUpdate})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
}

const emptyCart = async(req, res) => {
    try {
        const { cid } = req.params;
        const cartUpdate = await cartsServices.emptyCart(cid)    
        res.status(200).json({status: "Success", cartUpdate})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
}

const purchaseCart = async(req, res) => {
    try {
        const { cid } = req.params;
        const total = await cartsServices.purchaseCart(cid)
        const ticket = await ticketServices.createTicket(req.user.email, total)

        res.status(200).json({status: "Success", ticket})
    } catch(error) {
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
}

export default {
    createCart,
    getCartByID,
    addProductToCart,
    deleteProductFromCart,
    updateQuantity,
    emptyCart,
    purchaseCart
}