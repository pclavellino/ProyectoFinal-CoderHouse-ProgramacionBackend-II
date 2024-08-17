import fs from "fs";

let carts = [];

const path = "./src/data/carts.json";

const getCarts = async () => {

    const cartsJson = await fs.promises.readFile(path, "utf-8");
    const cartsParse = JSON.parse(cartsJson)
    carts = cartsParse || []
}

const createCart = async () => {

    await getCarts();
    const newCart = {
        id: carts.length + 1,
        products: []
    };

    carts.push(newCart);
    await fs.promises.writeFile(path, JSON.stringify(carts));

    return newCart;
}

const getCartById = async (id) => {

    await getCarts();
    const cart = carts.find( (cart) => cart.id === id);

    return cart;
}

const addProductToCart = async (cid, pid) => {

    await getCarts();
    const product = {
        product: pid,
        quantity: 1
    };

    const index = carts.findIndex( (cart) => cart.id === cid);

    const productIndex = carts[index].products.findIndex( (prod) => prod.product === pid)

    if (productIndex !== -1) {
        carts[index].products[productIndex].quantity += 1;
    } else {
        carts[index].products.push(product);
    }

    await fs.promises.writeFile(path, JSON.stringify(carts)); 
    
    return carts[index]
}

export default { getCarts, createCart, getCartById, addProductToCart };
