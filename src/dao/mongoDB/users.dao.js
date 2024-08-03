import { userModel } from "./models/user.model.js";

// Obtener todos los usuarios

const getAllUsers = async(query, options) => {
    const users = await userModel.paginate(query, options);
    return users;
}


// Obtener usuario por Email

const getUser = async(email) => {
    const user = await userModel.findOne({email: email});
    return user;
}


// Crear usuario

const createUser = async(data) => {
    const user = await userModel.create(data);
    return user;
}


// Actualizar un producto específico

const updateUser = async(id, data) => {
    await userModel.findByIdAndUpdate(id, data);
    const userUpdated = await userModel.findById(id);
    return userUpdated;
}


// Borrar un usuario específico

const deleteUser = async(id) => {
    await userModel.findByIdAndUpdate(id, {status:false})
    const userUpdated = await userModel.findById(id);
    return userUpdated;
}

export default { getAllUsers, getUser, createUser, updateUser, deleteUser };