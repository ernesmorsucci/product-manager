import express from 'express';
import CartManager from '../cartManager.js';

const cartsRouter = express.Router();
const cartManager = new CartManager('./src/data/carts.json');

// Ruta para crear un nuevo carrito
cartsRouter.post('/', async (req, res) => {
  try {
    const carts = await cartManager.addCart();
    res.status(201).json({ message: 'Carrito creado' }, carts);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
})

// Ruta para obtener los productos de un carrito por su ID
cartsRouter.get('/:cid/products', async (req, res) => {
  try {
    const cid = req.params.cid;
    const products = await cartManager.getProductsByCartId(cid);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al conseguir los productos" });
  }
})

// Agregar un producto a un carrito
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body;

    const updatedCart = await cartManager.addProductInCart(cid, pid, quantity);
    res.status(200).json({ message: 'Producto agregado al carrito', cart: updatedCart });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto al carrito" });
  }
})

export default cartsRouter;
