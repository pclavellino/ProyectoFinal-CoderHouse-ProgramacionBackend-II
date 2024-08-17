import { Router } from "express";
import { checkCartExistence } from "../middlewares/checkCartExistence.middleware.js";
import { checkProductExistence } from "../middlewares/checkProductExistence.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js"; 
import cartsController from "../controllers/carts.controller.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router()

router.post("/", passportCall("jwt"), cartsController.createCart)

router.get("/:cid", passportCall("jwt"), checkCartExistence, cartsController.getCartByID)

router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkCartExistence, checkProductExistence, cartsController.addProductToCart)

router.put("/:cid/product/:pid", passportCall("jwt"), checkCartExistence, checkProductExistence, cartsController.updateQuantity)

router.delete("/:cid/product/:pid", passportCall("jwt"), checkCartExistence, checkProductExistence, cartsController.deleteProductFromCart)

router.get("/:cid/purchase", passportCall("jwt"), authorization("user"), checkCartExistence, cartsController.purchaseCart)

router.delete("/:cid", passportCall("jwt"), checkCartExistence, cartsController.emptyCart)

export default router;