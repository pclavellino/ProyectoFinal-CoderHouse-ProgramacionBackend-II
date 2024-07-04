import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        mongoose.connect("mongodb+srv://pclavellino:Mongo2024@coderbackend-i.urz19td.mongodb.net/ProyectoFinal-Backend-1")
        console.log("Mongo DB Conectado")
    } catch(error) {
        console.log(`${error}`)
    }
}