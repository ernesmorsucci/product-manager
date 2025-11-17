// modules
import express from 'express';
import http from 'http';
import { engine } from 'express-handlebars';
// routes
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
//config
import connectMongoDB from './config/db.js';

//app setup
const app = express();
const server = http.createServer(app);
const PORT = 8080;

//middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//view engine setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//database conection
connectMongoDB();

//routes
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


//server listen
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})