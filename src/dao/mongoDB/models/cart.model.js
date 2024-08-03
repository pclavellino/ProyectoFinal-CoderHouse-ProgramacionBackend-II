import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartCollection = "cart"

const cartSchema = new mongoose.Schema({
        products: {
            type: [
                {
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "product"
                    },
                    quantity: Number
                }
            ]
        }
})

cartSchema.pre("find", function () {
    this.populate("products.product");
    });

cartSchema.plugin(mongoosePaginate);

export const cartModel = mongoose.model(cartCollection, cartSchema)