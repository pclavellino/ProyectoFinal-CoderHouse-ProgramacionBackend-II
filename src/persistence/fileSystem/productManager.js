import fs from "fs";

let products = [];

const path = "./src/data/products.json";

const addProduct = async (product) => {

    await getProducts();

    const { title, description, code, price, stock, category, thumbnails} = product;

    const newProduct = {
        id : products.length + 1,
        title,
        description,
        code,
        price,
        status : true,
        stock,
        category,
        thumbnails : thumbnails || []
    };

    products.push(newProduct);

    await fs.promises.writeFile(path, JSON.stringify(products));
    
    return product;
};

const getProducts = async (limit) => {

    const productsJson = await fs.promises.readFile(path, "utf8");
    const productsParse = JSON.parse(productsJson);
    products = productsParse || [];
    
    if (!limit) return products;
    
    return products.slice(0, limit);
};

const getProductById = async (id) => {

    await getProducts();
    const product = products.find( (prod) => prod.id === id);

    return product;
}

const deleteProduct = async (id) => {

    await getProducts();
    const productToDelete = await getProductById(id);
    if (!productToDelete) return false;
    products = products.filter( (prod) => prod.id !== id);

    await fs.promises.writeFile(path, JSON.stringify(products));

    return true
}

const updateProduct = async (id, body) => {

    await getProducts();

    const index = products.findIndex( (prod) => prod.id === id);

    products[index] = {
        ...products[index],
        ...body,
    };

    await fs.promises.writeFile(path, JSON.stringify(products));
    const product = await getProductById(id);
    
    return product;
}


export default { addProduct, getProducts, getProductById, updateProduct, deleteProduct };