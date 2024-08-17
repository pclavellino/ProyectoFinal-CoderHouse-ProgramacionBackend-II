import { productModel } from "./models/product.model.js";

// Obtener todos los productos

const getAll = async(query, options) => {
    const products = await productModel.paginate(query, options);
    return products;
}


// Obtener productos por ID

const getById = async(id) => {
    const product = await productModel.findById(id);
    return product;
}


// Crear productos

const createProd = async(data) => {
    const product = await productModel.create(data);
    return product;
}


// Actualizar un producto específico

const updateProd = async(id, data) => {
    await productModel.findByIdAndUpdate(id, data);
    const productUpdated = await productModel.findById(id);
    return productUpdated;
}


// Borrar un producto específico

const deleteProd = async(id) => {
    await productModel.findByIdAndUpdate(id, {status:false})
    const productUpdated = await productModel.findById(id);
    return productUpdated;
}

export default { getAll, getById, createProd, updateProd, deleteProd };
