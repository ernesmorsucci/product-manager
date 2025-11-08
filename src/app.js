//imports
import express from 'express';
import http from 'http';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import realTimeProductsRouter from './routes/realTimeProducts.router.js';

//app setup
const app = express();
const server = http.createServer(app);
const PORT = 8080;

//middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.io = io;
  next();
})

//view engine setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//routes
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//socket.io
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.emit('mensaje', 'Bienvenido al servidor de Socket.io');

  socket.on('mensajeCliente', (data) => {
    console.log('Mensaje del cliente:', data);
  })

})

//server listen
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})