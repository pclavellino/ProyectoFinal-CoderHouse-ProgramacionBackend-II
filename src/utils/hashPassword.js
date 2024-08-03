import bcrypt from "bcrypt";


// Hasheo de contraseña

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}


// Validación de contraseña

export const validatePassword = (userPassword, password) => {
    return bcrypt.compareSync(password, userPassword);
}

