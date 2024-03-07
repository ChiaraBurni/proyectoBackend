import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import productRouter from './routers/products/router.js';
import cartRouter from './routers/carts/router.js';
import vistasRouter from "./routers/vistas.js";
import socketProducts from "./listeners/realTimeProductUpdater.js";


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));

app.use("/", vistasRouter);

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

const server = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

const io = new Server(server); 

socketProducts(io);

