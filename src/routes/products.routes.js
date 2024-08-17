import { Router } from "express";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import { checkProductExistence } from "../middlewares/checkProductExistence.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import productsController from "../controllers/products.controller.js";

const router = Router()

router.get("/", passportCall("jwt"), productsController.getAllProducts)

router.get("/:pid", passportCall("jwt"), checkProductExistence, productsController.getProductByID)

router.post("/", passportCall("jwt"), authorization("admin"), checkProductData, productsController.createProduct)

router.put("/:pid", passportCall("jwt"), authorization("admin"), checkProductExistence, productsController.updateProduct)

router.delete("/:pid", passportCall("jwt"), authorization("admin"), checkProductExistence, productsController.deleteProduct)

export default router;