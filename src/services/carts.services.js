import cartRepository from "../persistence/mongoDB/cart.repository.js";
import productRepository from "../persistence/mongoDB/product.repository.js";

const createCart = async() => {
    return await cartRepository.createCart()
};

const getCartByID = async(cid) => {
    return await cartRepository.getById(cid)
};

const addProductToCart = async(cid, pid) => {
    return await cartRepository.addProductToCart(cid, pid)
};

const deleteProductFromCart = async(cid, pid) => {
    return await cartRepository.deleteProductfromCart(cid, pid)
};

const updateQuantity = async(cid, pid, quantity) => {
    return await cartRepository.updateQuantity(cid, pid, quantity)
}

const emptyCart = async(cid) => {
    return await cartRepository.emptyCart(cid)
}

const purchaseCart = async(cid) => {
    const cart = await cartRepository.getById(cid);
    let total = 0;
    const productOutOfStock = [];
    
    for (const productCart of cart.products) {
        const product = await productRepository.getById(productCart.product);

        if (product.stock >= productCart.quantity) {
            total += product.price * productCart.quantity;
            await productRepository.updateProd(product._id, { stock: product.stock - productCart.quantity})
        } else {
            productOutOfStock.push(productCart)
        }
        await cartRepository.updateCart(cid, { products: productOutOfStock });

    }

    return total;
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