import productsServices from "../services/products.services.js";

const getAllProducts = async (req, res) => {
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
            const products = await productsServices.getAllProducts({category}, options)
            return res.status(200).json({status: "Success", products})
        }

        if (status) {
            const products = await productsServices.getAllProducts({status}, options)
            return res.status(200).json({status: "Success", products}) 
        }

        const products = await productsServices.getAllProducts({}, options)
        res.status(200).json({status: "Success", products})

    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
};

const getProductByID = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsServices.getProductByID(pid);
        res.status(200).json({status: "Success", product});
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
};

const createProduct = async (req, res) => {
    try {
        const body = req.body;
        const product = await productsServices.createProduct(body)
        res.status(201).json({status: "Success", product})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
};

const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const body = req.body;
        const updatedProduct = await productsServices.updateProduct(pid, body)
        res.status(200).json({status: "Success", updatedProduct})     
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        await productsServices.deleteProduct(pid)
        res.status(200).json({status: "Success", msg: "Producto eliminado correctamente"})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
};

export default {
    getAllProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
}