import express from "express";
import routes from "./routes/index.routes.js";
import viewRoutes from "./routes/views.routes.js"
import handlebars from "express-handlebars";
import session from "express-session";
import { Server } from "socket.io";
import { connectMongoDB } from "./config/mongoDB.config.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import envs from "./config/envs.config.js";
import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import productsController from "./controllers/products.controller.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Conexión con MongoDB

connectMongoDB();

const httpServer = app.listen(envs.PORT, () => {
    console.log(`Servidor iniciado y escuchando en el puerto ${envs.PORT}`)
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

// Inicializacion de Cookie Parser

app.use(cookieParser());

// Configuracion de Sesiones

app.use(
    session({
        secret: "Coder",
        resave: true,
        saveUninitialized: true
    })
)

// Inicializacion de Passport

initializePassport()
app.use(passport.initialize())
app.use(passport.session())


// Configuración de Rutas

app.use("/", viewRoutes);
app.use("/api", routes);


// Conexión de Socket.io

io.on("connection", async (socket) => {
    console.log("Nuevo Cliente Conectado")
    const products = await productsController.getAllProducts();
    io.emit("products", products.docs)
});