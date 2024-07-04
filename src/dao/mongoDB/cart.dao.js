import { cartModel } from "./models/cart.model.js";

// Obtener todos los carritos

const getAll = async() => {
    const carts = await cartModel.find();
    return carts;
}


// Obtener un carrito por ID

const getById = async(id) => {
    const cart = await cartModel.findById(id).populate("products.product");
    return cart;
}


// Crear un carrito

const createCart = async(data) => {
    const cart = await cartModel.create(data);
    return cart;
}


// Agregar un producto a un carrito

const addProductToCart = async(cid, pid) => {
    const cart = await cartModel.findById(cid);
    const productInCart = cart.products.find((element) => element.product == pid);

    if (productInCart) {
        productInCart.quantity++;
    } else {
        cart.products.push({product: pid, quantity: 1});
    };

    await cart.save();
    return cart;
}


// Actualizar la cantidad de un producto en un carrito específico

const updateQuantity = async(cid, pid, quantity) => {
    const cart = await cartModel.findById(cid);
    const productInCart = cart.products.find((element) => element.product == pid);
    productInCart.quantity = quantity;

    await cart.save();
    return cart;
}


// Borrar un producto del carrito especificado

const deleteProductfromCart = async(cid, pid) => {
    const cart = await cartModel.findById(cid);
    cart.products = cart.products.filter((element) => element.product != pid);

    cart.save();
    return cart;
}


// Vaciar un carrito específico

const emptyCart = async(cid) => {
    const cart = await cartModel.findById(cid);
    cart.products = []

    cart.save();
    return cart;
}

export default { getAll, getById, createCart, addProductToCart, deleteProductfromCart, emptyCart, updateQuantity };