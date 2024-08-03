import jwt from "jsonwebtoken";
import envs from "../config/envs.config.js";

export const createToken = (user) => {
    const { _id, role, email, cart} = user;
    const token = jwt.sign({_id, role, email, cart}, envs.JWT_SECRET_CODE, { expiresIn: "5m" });

    return token;
}

export const validateToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, envs.JWT_SECRET_CODE);
        return decodedToken;
    } catch(error) {
        return null;
    }
}