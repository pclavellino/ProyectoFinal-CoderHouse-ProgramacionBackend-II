import express from "express";
import routes from "./routes/index.routes.js";
import viewRoutes from "./routes/views.routes.js"
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { connectMongoDB } from "./config/mongoDB.config.js";
import __dirname from "./dirname.js";
import productDao from "./dao/mongoDB/product.dao.js";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Conexión con MongoDB

connectMongoDB();

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`)
});

// Inicialización de Socket.io

export const io = new Server(httpServer);


// Configuración de Handlebars

const hbs = handlebars.create({
    extname: '.hbs',
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
        }
    });

app.engine("hbs", hbs.engine);
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

// Configuración de Rutas

app.use("/", viewRoutes);
app.use("/api", routes);

// Conexión de Socket.io

io.on("connection", async (socket) => {
    console.log("Nuevo Cliente Conectado")
    const products = await productDao.getAll()
    io.emit("products", products.docs)
});