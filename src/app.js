import express from 'express';
import exphbs from 'express-handlebars';
import { Server } from 'socket.io'; 
import { createServer } from 'http'; 
import path from 'path';
import { router as productsRouter } from './routers/products.router.js';
import { router as cartsRouter } from './routers/carts.router.js';
import './database.js'; 

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 

app.engine(
  'handlebars',
  exphbs.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const httpServer = createServer(app); 
const io = new Server(httpServer); 
httpServer.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));


