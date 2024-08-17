import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const usersCollection = "users"

const userSchema = new mongoose.Schema({
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        age: {
            type: Number,
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "cart"
        },
        role: {
            type: String,
            default: "user",
        }
})

userSchema.pre("findOne", function () {
    this.populate("cart");
    });

userSchema.plugin(mongoosePaginate);

export const userModel = mongoose.model(usersCollection, userSchema)