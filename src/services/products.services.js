import productRepository from "../persistence/mongoDB/product.repository.js";


const getAllProducts = async(query, options) => {
    return await productRepository.getAll(query, options);
};

const getProductByID = async(pid) => {
    return await productRepository.getById(pid);
};

const createProduct = async(productData) => {
    return await productRepository.createProd(productData);
};

const updateProduct = async(pid, productData) => {
    return await productRepository.updateProd(pid, productData);
};

const deleteProduct = async(pid) => {
    return await productRepository.deleteProd(pid);
};

export default {
    getAllProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
}